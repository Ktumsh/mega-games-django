import os
import json
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from django.conf import settings
from .models import Game, CartItem
from .forms import ProfileUpdateForm

def my_view(request, template_name):
    context = {
        'is_authenticated': request.user.is_authenticated,
        'username': request.user.username if request.user.is_authenticated else '',
        'profile_image_url': request.user.profile.image.url if request.user.is_authenticated else ''
    }
    return render(request, template_name, context)

@login_required
def index(request):
    return my_view(request, 'store/index.html')

@csrf_exempt
def user_login(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username_or_email = data.get('username')
            password = data.get('password')
            if username_or_email and password:
                user = authenticate(request, username=username_or_email, password=password)
                if user is not None:
                    user.backend = 'store.backends.UsernameOrEmailBackend'
                    login(request, user)
                    return JsonResponse({'status': 'ok'})
                else:
                    return JsonResponse({'status': 'error', 'message': 'Credenciales incorrectas, verifica tu usuario o contraseña o crea una cuenta.'}, status=400)
            else:
                return JsonResponse({'status': 'error', 'message': 'Todos los campos son obligatorios.'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'JSON inválido.'}, status=400)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': f'Error del servidor: {str(e)}'}, status=500)
    else:
        return render(request, 'user/login.html')

@csrf_exempt
def user_signup(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
            email = data.get('email')

            if username and password and email:
                if User.objects.filter(username=username).exists():
                    return JsonResponse({'status': 'error', 'message': 'Nombre de usuario ya registrado. Prueba con otro.'}, status=409)
                if User.objects.filter(email=email).exists():
                    return JsonResponse({'status': 'error', 'message': 'Correo ya registrado. Prueba con otro.'}, status=409)
                user = User.objects.create_user(username, email, password)
                user.backend = 'store.backends.UsernameOrEmailBackend'
                login(request, user)
                return JsonResponse({'redirect': '/'})
            else:
                return JsonResponse({'status': 'error', 'message': 'Todos los campos son obligatorios.'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'JSON inválido'}, status=400)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
    return render(request, 'user/join.html')

def user_logout(request):
    logout(request)
    return render(request, 'user/logout.html')

def check_auth(request):
    if request.user.is_authenticated:
        return JsonResponse({'isAuthenticated': True, 'username': request.user.username})
    else:
        return JsonResponse({'isAuthenticated': False})
    

@login_required
def view_cart(request):
    cart_items = CartItem.objects.filter(user=request.user)
    total_price = sum(item.game.precio_descuento or item.game.precio_original for item in cart_items)
    
    context = {
        'is_authenticated': request.user.is_authenticated,
        'username': request.user.username if request.user.is_authenticated else ''
    }
    return render(request, 'store/cart.html', {'cart_items': cart_items, 'total_price': total_price, **context})

@login_required
def add_to_cart(request, game_id):
    game = get_object_or_404(Game, pk=game_id)
    cart_item, created = CartItem.objects.get_or_create(user=request.user, game=game)
    
    if not created:
        cart_item.quantity += 1
        cart_item.save()

    return JsonResponse({'message': 'Producto agregado al carrito'})

@login_required
def cart_count(request):
    if request.method == 'GET':
        count = CartItem.objects.filter(user=request.user).count()
        return JsonResponse({'totalItems': count})
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)

@login_required
def reduce_stock(request, game_id):
    game = get_object_or_404(Game, pk=game_id)
    data = json.loads(request.body)
    quantity = data.get('quantity', 1)

    if game.stock >= quantity:
        game.stock -= quantity
        game.save()
        return JsonResponse({'stock': game.stock})
    else:
        return JsonResponse({'error': 'Stock insuficiente'}, status=400)
    
@login_required
def return_stock(request, game_id):
    try:
        game = Game.objects.get(id=game_id)
        data = json.loads(request.body)
        quantity = data.get('quantity', 1)
        game.stock += quantity
        game.save()
        return JsonResponse({'status': 'success', 'stock': game.stock})
    except Game.DoesNotExist:
        return JsonResponse({'status': 'error', 'message': '_Juego no encontrado.'}, status=404)
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)    
    
@login_required
def remove_from_cart(request, game_id):
    cart_item = get_object_or_404(CartItem, user=request.user, game_id=game_id)
    game = cart_item.game

    if cart_item.quantity > 1:
        cart_item.quantity -= 1
        cart_item.save()
    else:
        cart_item.delete()

    return JsonResponse({'message': 'Producto eliminado del carrito y stock actualizado'})

@login_required
def clear_cart(request):
    cart_items = CartItem.objects.filter(user=request.user)
    
    cart_items.delete()
    
    return JsonResponse({'message': 'Carrito vaciado y stock actualizado'})

@login_required
def cart_items(request):
    cart_items = CartItem.objects.filter(user=request.user).select_related('game')
    items = [
        {
            'id': item.id,
            'quantity': item.quantity,
            'game': {
                'id': item.game.id,
                'nombre': item.game.nombre,
                'precio_descuento': str(item.game.precio_descuento) if item.game.precio_descuento else None,
                'precio_original': str(item.game.precio_original) if item.game.precio_original else None,
                'imagen': item.game.imagen,
                'imagen_alternativa': item.game.imagen_alternativa,
                'background': item.game.background,
                'descuento': item.game.descuento,
                'disponible_en': item.game.disponible_en,
            }
        }
        for item in cart_items
    ]
    return JsonResponse(items, safe=False)

@login_required
@require_http_methods(["GET", "POST"])
def game_likes(request, group, game_id):
    game = get_object_or_404(Game, id=game_id, origen__iexact=group)
    
    if request.method == 'GET':
        return JsonResponse({'likes': game.likes})

    if request.method == 'POST':
        data = json.loads(request.body)
        action = data.get('action')
        if action == 'like':
            game.likes += 1
        elif action == 'unlike' and game.likes > 0:
            game.likes -= 1
        game.save()
        return JsonResponse({'likes': game.likes})

def games_list(request):
    games = Game.objects.all()
    games_data = []

    for game in games:
        try:
            detalles = json.loads(game.detalles) if game.detalles else {}
        except json.JSONDecodeError:
            detalles = {}

        if isinstance(detalles, list):
            lanzamiento = next((item['lanzamiento'] for item in detalles if 'lanzamiento' in item), 'Fecha no disponible')
        else:
            lanzamiento = detalles.get('lanzamiento', 'Fecha no disponible')

        generos = game.generos if isinstance(game.generos, list) else []

        games_data.append({
            'id': game.id,
            'nombre': game.nombre,
            'nombre_maincap': game.nombre_maincap,
            'dlc': game.dlc,
            'imagen': game.imagen,
            'imagen_alternativa': game.imagen_alternativa,
            'background': game.background,
            'descuento': game.descuento,
            'precio_original': str(game.precio_original) if game.precio_original else None,
            'precio_descuento': str(game.precio_descuento) if game.precio_descuento else None,
            'disponible_en': game.disponible_en,
            'key': game.key,
            'key_img': game.key_img,
            'key_link': game.key_link,
            'likes': game.likes,
            'galeria': game.galeria,
            'generos': generos,
            'descripcion': game.descripcion,
            'adicional': game.adicional,
            'intro_caracteristicas': game.intro_caracteristicas,
            'caracteristicas': game.caracteristicas,
            'descripcion_adicional': game.descripcion_adicional,
            'requisitos': game.requisitos,
            'detalles': detalles,
            'lanzamiento': lanzamiento,
            'restriccion': game.restriccion,
            'restriccion_img': game.restriccion_img,
            'stock': game.stock,
            'origen': game.origen,
        })

    return JsonResponse(games_data, safe=False)

def games_by_origin(request, origin):
    games = Game.objects.filter(origen=origin).values()
    games_data = list(games)
    
    for game in games_data:
        if isinstance(game['galeria'], str):
            game['galeria'] = json.loads(game['galeria'])

    return JsonResponse(games_data, safe=False)

def genres(request):
    file_path = os.path.join(settings.BASE_DIR, 'store', 'static', 'store', 'api', 'gen_cards.json')
    with open(file_path, 'r', encoding='utf-8') as file:
        genres = json.load(file)
    return JsonResponse(genres, safe=False)

#VIEWS ADICIONALES
@login_required
def cart(request):
    return my_view(request, 'store/cart.html')

def about(request):
    return my_view(request, 'about/about.html')

@login_required
def community(request):
    return my_view(request, 'about/community.html')

@login_required
def help(request):
    return my_view(request, 'about/help.html')

@login_required
def tienda(request):
    return my_view(request, 'store/tienda.html')

@login_required
def activision(request):
    return my_view(request, 'store/ActivisionPublisherSale2024.html')

@login_required
def ofertas_especiales(request):
    return my_view(request, 'store/ofertas-especiales.html')

@login_required
def juegos_populares(request):
    return my_view(request, 'store/juegos-populares.html')

@login_required
def juegos_y_tarjetas(request):
    return my_view(request, 'store/juegos-y-tarjetas.html')

@login_required
def notifications(request):
    return my_view(request, 'profile/notifications.html')

@login_required
def profile(request, username):
    if request.method == 'POST':
        p_form = ProfileUpdateForm(request.POST, request.FILES, instance=request.user.profile)
        if p_form.is_valid():
            p_form.save()
            return redirect('profile', username=username)
    else:
        p_form = ProfileUpdateForm(instance=request.user.profile)

    context = {
        'is_authenticated': request.user.is_authenticated,
        'username': request.user.username if request.user.is_authenticated else '',
        'p_form': p_form,
        'profile_image_url': request.user.profile.image.url if request.user.is_authenticated else ''
    }

    return render(request, 'profile/profile.html', context)

def get_game_details(request, template_name):
    import urllib.parse

    game_name = request.GET.get('game')
    group = request.GET.get('group')
    item_id = request.GET.get('item')

    if game_name:
        game_name = urllib.parse.unquote(game_name)

    game = get_object_or_404(Game, id=item_id, origen__iexact=group, nombre__iexact=game_name)

    def clean_data(data):
        return json.loads(data) if data else []

    generos = clean_data(game.generos)

    game_data = {
        'id': game.id,
        'nombre': game.nombre,
        'nombreMaincap': game.nombre_maincap,
        'dlc': game.dlc,
        'imagen': game.imagen,
        'imagen_alternativa': game.imagen_alternativa,
        'background': game.background,
        'descuento': game.descuento,
        'precio_original': str(game.precio_original) if game.precio_original else None,
        'precio_descuento': str(game.precio_descuento) if game.precio_descuento else None,
        'disponibleEn': game.disponible_en,
        'key': game.key,
        'keyImg': game.key_img,
        'keyLink': game.key_link,
        'likes': game.likes,
        'galeria': clean_data(game.galeria),
        'generos': generos,
        'descripcion': game.descripcion,
        'introCaracteristicas': game.intro_caracteristicas,
        'caracteristicas': clean_data(game.caracteristicas),
        'descripcionAdicional': clean_data(game.descripcion_adicional),
        'requisitos': clean_data(game.requisitos),
        'detalles': clean_data(game.detalles),
        'restriccionImg': game.restriccion_img,
        'restriccion': game.restriccion,
        'origen': game.origen,
    }

    context = {
        'game': json.dumps(game_data),
        'is_authenticated': request.user.is_authenticated,
        'username': request.user.username if request.user.is_authenticated else '',
        'profile_image_url': request.user.profile.image.url if request.user.is_authenticated else ''
    }
    return render(request, template_name, context)


@login_required
def games_details(request):
    return get_game_details(request, 'store/games-details.html')

@login_required
def gift_details(request):
    return get_game_details(request, 'store/gift-details.html')

@login_required
def offer_details(request):
    return get_game_details(request, 'store/offer-details.html')

@login_required
def publisher_sale_details(request):
    return get_game_details(request, 'store/publisher-sale-details.html')
