from django.db import models
from django.conf import settings
from django.contrib.auth import get_user_model
# Create your models here.

class PersonalizedData1(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    founders = models.JSONField(default=list)

  
   
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
   
   

    def __str__(self):
        return self.user.username
