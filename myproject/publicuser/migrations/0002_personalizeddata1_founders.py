# Generated by Django 4.2.5 on 2023-10-27 02:33

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('publicuser', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='personalizeddata1',
            name='founders',
            field=models.ManyToManyField(blank=True, related_name='founder_friends', to=settings.AUTH_USER_MODEL),
        ),
    ]
