

# Create your models here.

# models.py in your app
from django.db import models
from django.conf import settings
class Question(models.Model):
    text = models.CharField(max_length=255)

    def __str__(self):
        return self.text
class PersonalizedData(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
  
    bio = models.TextField(blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    question = models.ManyToManyField(Question, related_name='personalized_data_questions')
    answers = models.JSONField(default=list)  # Store answers as a JSON array


    def __str__(self):
        return self.user.username
    

