from django.shortcuts import render
# views.py
from django.contrib.auth import authenticate, login, logout
from rest_framework.authtoken.views import ObtainAuthToken
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from .models import PersonalizedData1
from .serializers import PersonalizedDataSerializer
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication,BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import PersonalizedData1

from django.views.decorators.csrf import csrf_exempt
import json
# Create your views here.
@csrf_exempt
@api_view(['POST'])
def register_view(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')
        type=request.data.get('type')
        email=request.data.get('email')
        if username and password:
            User=get_user_model()
            if not User.objects.filter(username=username).exists():
                user = User.objects.create_user(username=username, password=password,email=email,user_type=type)

                personalized_data = PersonalizedData1(user=user) 
                personalized_data.save()
                personalized_dashboard_url = 'http://localhost:3000/welcome' 
                token, created = Token.objects.get_or_create(user=user)
                user = authenticate(request, username=username, password=password)
                login(request, user)
                return JsonResponse({'redirect_url': personalized_dashboard_url,'token': token.key})
                
            else:
                return Response({'message': 'Username already in use'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'message': 'Invalid request'}, status=status.HTTP_400_BAD_REQUEST)
        


  # Require authentication for this view
@csrf_exempt  
@api_view(['POST'])
def login_view(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')
        user_type=request.data.get('type')
        if username and password:
            user = authenticate(request, username=username, password=password)
            if user is not None:
                # User is authenticated, generate an authentication token
                if user.user_type == user_type:
                 login(request,user)
                 token, created = Token.objects.get_or_create(user=user)
                # Return the token and redirect URL in the response
                 response_data = {
                    'token': token.key,
                    'redirect_url': 'http://localhost:3000/welcome',  # Replace with your desired redirect URL
                 }
                return Response(response_data)
            else:
                # Invalid credentials, return an error response
                return Response({'error': 'Invalid username or password'}, status=401)
        else:
            # Invalid request, return an error response
            return Response({'error': 'Invalid request'}, status=400)
    else:
        # Method not allowed, return an error response
        return Response({'error': 'Method not allowed'}, status=405)
  # Allow any user to access this view (public endpoint)

from oauth2_provider.models import AccessToken
from django.contrib.sessions.models import Session
@csrf_exempt
@authentication_classes([TokenAuthentication])  # Use appropriate authentication method (Token, Session, etc.)
@permission_classes([IsAuthenticated])
def logout_view(request):
    
    Session.objects.all().delete()
    logout(request)
  
    return JsonResponse({'message': 'logoutdone'})

# views.py
@api_view(['POST'])
def save_personalized_data(request):
    if request.method == 'POST':
        serializer = PersonalizedDataSerializer(data=request.data)
        if serializer.is_valid():
            # Get the current user from the request
            user = request.user
       
            profile_picture = serializer.validated_data.get('profile_picture', None)
            

        
            # Update or create personalized data for the user
            personalized_data, created = PersonalizedData1.objects.update_or_create(
                user=user,
                defaults={
                   
                    'profile_picture': profile_picture,
                  
                }
            )

            return Response({'message': 'Personalized data saved successfully'})
        else:
            return Response(serializer.errors, status=400)
    else:
        return Response({'error': 'Invalid request method'}, status=400)
        
@api_view(['GET'])
@authentication_classes([TokenAuthentication])  # Use appropriate authentication method (Token, Session, etc.)
@permission_classes([IsAuthenticated])  # Ensure the user is authenticated
def get_user_data(request):
    user = request.user
    personalized_data = PersonalizedData1.objects.filter(user=user).first()
    if personalized_data:
        serializer = PersonalizedDataSerializer(personalized_data)
        return Response(serializer.data)
    else:
        return Response({'message': 'Personalized data not found for the user'}, status=404)
    

    
@api_view(['GET'])
@authentication_classes([TokenAuthentication])  # Use appropriate authentication method (Token, Session, etc.)
@permission_classes([IsAuthenticated])  # Ensure the user is authenticated
def get_authenticated_user_info(request):
    user = request.user
    response_data = {
        'username': user.username,
        'email': user.email,
        'type':"public"     # Add other user data as needed
        # ...
    }
    return Response(response_data)
from google.oauth2 import id_token

from google.auth.transport import requests
from django.contrib.sessions.models import Session

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from oauth2_provider.models import AccessToken
from django.utils import timezone
class GoogleLoginAPIView(APIView):
    def post(self, request):
        access_token = request.data.get('access_token')
        type=request.data.get('type')
        
        try:
            # Verify the Google access token
            id_info = id_token.verify_oauth2_token(access_token, requests.Request())
            
            # Get user information from the verified token
            user_email = id_info.get('email')
            
            User = get_user_model() 
            user = User.objects.filter(email=user_email).first()
            if not user:
              
                # If user does not exist, create a new user
                 user, created = User.objects.get_or_create(email=user_email, defaults={'username': user_email, 'user_type':'PUBLIC'})
                 
                # Create or retrieve a token for the user (if you are using token authentication)
           
            token, created = Token.objects.get_or_create(user=user)
             

        # Revoke the access token by deleting it
            
            # Return authentication token
            return Response({
                'message': 'Successfully authenticated',
                'access_token': token.key,
            }, status=status.HTTP_200_OK)

        except ValueError:
            # Invalid token
          
            Session.objects.all().delete()
       
            return Response({'error': 'Invalid access token'}, status=status.HTTP_401_UNAUTHORIZED)

        except Exception as e:
            # Handle other exceptions
            Session.objects.all().delete()
          
            return Response({'error': str(e)+user_email}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
