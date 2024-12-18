# Generated by Django 5.1.4 on 2024-12-09 11:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0015_alter_profile_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='default_image',
            field=models.URLField(default='https://res.cloudinary.com/dcub4itgg/image/upload/v1733740981/tf9dia6ktszxmwxr2uiy.jpg'),
        ),
        migrations.AlterField(
            model_name='profile',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]
