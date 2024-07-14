from django.contrib import admin
from .models import Game, CartItem, Like, Order, Profile

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
    
@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    list_display = ('user', 'game', 'liked_at')
    
class CartItemInline(admin.TabularInline):
    model = Order.items.through
    extra = 0

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    inlines = [CartItemInline]
    list_display = ('user', 'total_price', 'created_at', 'status')
    search_fields = ('user__username', 'items__game__nombre')
    list_filter = ('status', 'created_at')
    readonly_fields = ('created_at',)
    
@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'image')
    
    