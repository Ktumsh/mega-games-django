import os
from django.db import models
from django.contrib.auth.models import User
from PIL import Image

class Game(models.Model):
    id = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=255)
    nombre_maincap = models.CharField(max_length=255)
    dlc = models.BooleanField(default=False)
    imagen = models.URLField()
    imagen_alternativa = models.URLField(blank=True, null=True)
    background = models.URLField(blank=True, null=True)
    descuento = models.CharField(max_length=10, blank=True, null=True)
    precio_original = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    precio_descuento = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    disponible_en = models.JSONField()
    key = models.CharField(max_length=50, blank=True, null=True)
    key_img = models.URLField(blank=True, null=True)
    key_link = models.URLField(blank=True, null=True)
    likes = models.IntegerField()
    galeria = models.JSONField()
    generos = models.JSONField()
    descripcion = models.TextField(blank=True, null=True)
    adicional = models.BooleanField(default=False)
    intro_caracteristicas = models.TextField(blank=True, null=True)
    caracteristicas = models.JSONField()
    descripcion_adicional = models.JSONField()
    requisitos = models.JSONField()
    detalles = models.JSONField()
    restriccion = models.CharField(max_length=10, blank=True, null=True)
    restriccion_img = models.URLField(blank=True, null=True)
    stock = models.IntegerField()
    origen = models.CharField(max_length=50)

    def __str__(self):
        return self.nombre

class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    liked_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} likes {self.game.nombre}"

class CartItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cart_items')
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name='cart_items')
    quantity = models.PositiveIntegerField(default=1)
    added_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.game.nombre} ({self.quantity}) - {self.user.username}"

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    items = models.ManyToManyField('OrderItem', related_name='orders')
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, default='Finalizada')

    def __str__(self):
        return f'Order {self.id} by {self.user.username}'

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='order_items')
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name='order_items')
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.game.nombre} (x{self.quantity})"

    
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(
        upload_to='',
        blank=True,
        null=True
    )
    default_image = models.URLField(
        default='https://res.cloudinary.com/dcub4itgg/image/upload/v1733740981/tf9dia6ktszxmwxr2uiy.jpg'
    )

    def __str__(self):
        return f'{self.user.username} Profile'

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.image and not self.image.name.startswith('http') and os.path.exists(self.image.path):
            img = Image.open(self.image.path)
            if img.height > 300 or img.width > 300:
                output_size = (300, 300)
                img.thumbnail(output_size)
                img.save(self.image.path)

    @property
    def profile_image(self):
        if self.image:
            return self.image.url
        return self.default_image