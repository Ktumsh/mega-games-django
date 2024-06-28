from django.contrib import admin
from .models import Game, CartItem

@admin.register(Game)
class GameAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'nombre', 'nombre_maincap', 'dlc', 'imagen', 'imagen_alternativa', 
        'background', 'descuento', 'precio_original', 'precio_descuento', 'stock', 'origen'
    )

@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ('user', 'game', 'quantity', 'added_at')
    search_fields = ('user__username', 'game__nombre')