# serializers.py in your Django app
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import PersonalizedData

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')  # Add more fields if needed

class PersonalizedDataSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)  # Serialize the associated user data along with personalized data

    class Meta:
        model = PersonalizedData
        fields = ('id', 'user', 'bio', 'profile_picture','investors')  # Add more fields as needed
