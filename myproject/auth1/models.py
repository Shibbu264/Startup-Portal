from django.db import models

# Create your models here.
from django.db import models

class Authentication(models.Model):
    Email=models.CharField(max_length=40)
    Password=models.CharField(max_length=15)
    def __str__ (self):
     return self.Email