# Generated by Django 5.0.6 on 2024-06-27 03:05

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Game',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=255)),
                ('nombre_maincap', models.CharField(max_length=255)),
                ('dlc', models.BooleanField(default=False)),
                ('imagen', models.URLField()),
                ('imagen_alternativa', models.URLField(blank=True, null=True)),
                ('background', models.URLField(blank=True, null=True)),
                ('descuento', models.CharField(blank=True, max_length=10, null=True)),
                ('precio_original', models.DecimalField(decimal_places=2, max_digits=10)),
                ('precio_descuento', models.DecimalField(decimal_places=2, max_digits=10)),
                ('plataforma', models.CharField(blank=True, max_length=50, null=True)),
                ('disponible_en', models.JSONField()),
                ('key', models.CharField(blank=True, max_length=50, null=True)),
                ('key_img', models.URLField(blank=True, null=True)),
                ('key_link', models.URLField(blank=True, null=True)),
                ('likes', models.IntegerField()),
                ('galeria', models.JSONField()),
                ('generos', models.JSONField()),
                ('descripcion', models.TextField()),
                ('adicional', models.BooleanField(default=False)),
                ('intro_caracteristicas', models.TextField(blank=True, null=True)),
                ('caracteristicas', models.JSONField()),
                ('descripcion_adicional', models.JSONField()),
                ('requisitos', models.JSONField()),
                ('detalles', models.JSONField()),
                ('restriccion', models.CharField(blank=True, max_length=10, null=True)),
                ('restriccion_img', models.URLField(blank=True, null=True)),
                ('stock', models.IntegerField()),
                ('origen', models.CharField(max_length=50)),
            ],
        ),
    ]
