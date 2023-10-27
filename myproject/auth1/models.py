

# Create your models here.

# models.py in your app
from django.db import models
from django.conf import settings
from django.contrib.auth import get_user_model

from django.contrib.auth.models import AbstractUser

class Notification(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    text = models.CharField(max_length=255)
    sender=models.CharField(max_length=255,null=True,default="Jaadu")

    def __str__(self):
        return self.text
class CustomUser(AbstractUser):
    USER_TYPES = (
        ('PUBLIC', 'PUBLIC'),
        ('admin', 'Admin User'),
        ('FOUNDERS', 'FOUNDERS'),
        ('INVESTORS', 'INVESTORS'),
    )
    
    user_type = models.CharField(max_length=10, choices=USER_TYPES, default='regular')


class Question(models.Model):
    text = models.CharField(max_length=255)

    def __str__(self):
        return self.text
class PersonalizedData(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    investors = models.JSONField(default=list)
  
    bio = models.TextField(blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    question = models.ManyToManyField(Question, related_name='personalized_data_questions')
    answers = models.JSONField(default=list)  # Store answers as a JSON array


    def __str__(self):
        return self.user.username
    
