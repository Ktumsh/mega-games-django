# Generated by Django 5.0.6 on 2024-07-14 19:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0007_order'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='items',
            field=models.ManyToManyField(related_name='orders', to='store.cartitem'),
        ),
    ]