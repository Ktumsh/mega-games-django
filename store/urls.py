from django.urls import path, re_path
from django.shortcuts import redirect
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    re_path(r'^accounts/login/$', lambda request: redirect('/login/')),
    # INICIO
    path('', views.index, name='index'),
    # AUTENTICACION
    path('login/', views.user_login, name='login'),
    path('signup/', views.user_signup, name='signup'),
    path('logout/', views.user_logout, name='logout'),
    path('api/check-auth/', views.check_auth, name='check_auth'),
    # CARRITO
    path('cart/', views.view_cart, name='view_cart'),
    path('api/cart/items/', views.cart_items, name='cart_items'),
    path('api/cart/count/', views.cart_count, name='cart_count'),
    path('api/cart/add/<int:game_id>/', views.add_to_cart, name='add_to_cart'),
    path('api/cart/remove/<int:game_id>/', views.remove_from_cart, name='remove_from_cart'),
    path('api/cart/clear/', views.clear_cart, name='clear_cart'),
    path('api/cart/returnStock/<int:game_id>/', views.return_stock, name='return_stock'),
    # GESTION DE JUEGOS
    path('api/games/reduceStock/<int:game_id>/', views.reduce_stock, name='reduce_stock'),
    path('api/games/<str:group>/<int:game_id>/', views.game_likes, name='game_likes'),
    path('api/games/', views.games_list, name='games_list'),
    path('api/games/<str:origin>/', views.games_by_origin, name='games_by_origin'),
    # GENEROS
    path('api/genres/', views.genres, name='genres'),
    # ABOUT
    path('about/', views.about, name='about'),
    path('community/', views.community, name='community'),
    path('help/', views.help, name='help'),
    # STORE
    path('tienda/', views.tienda, name='tienda'),
    path('ActivisionPublisherSale2024/', views.activision, name='ActivisionPublisherSale2024'),
    path('ofertas-especiales/', views.ofertas_especiales, name='ofertas_especiales'),
    path('juegos-populares/', views.juegos_populares, name='juegos_populares'),
    path('juegos-y-tarjetas/', views.juegos_y_tarjetas, name='juegos_y_tarjetas'),
    path('offer-details/', views.offer_details, name='offer_details'),
    path('games-details/', views.games_details, name='games_details'),
    path('gift-details/', views.gift_details, name='gift_details'),
    path('publisher-sale-details/', views.publisher_sale_details, name='publisher_sale_details'),
    # PERFIL
    path('profiles/notifications/', views.notifications, name='notifications'),
    path('profile/<str:username>/', views.profile, name='profile'),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)