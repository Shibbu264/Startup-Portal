# views.py
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from .models import PersonalizedData
from .serializers import PersonalizedDataSerializer
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import PersonalizedData
from .serializers import PersonalizedDataSerializer
from django.views.decorators.csrf import csrf_exempt

def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            personalized_dashboard_url = 'http://localhost:3000/fillform' 
            return JsonResponse({'redirect_url': personalized_dashboard_url})
        else:
            return JsonResponse({'message': 'Login failed'}, status=401)
    return JsonResponse({'message': 'Invalid request'}, status=400)
@csrf_exempt
def logout_view(request):
    logout(request)
    return JsonResponse({'message': 'Logout successful!'})

# views.py





@api_view(['POST'])
def register_view(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')
        if username and password:
            User = get_user_model()
            if not User.objects.filter(username=username).exists():
                user = User.objects.create_user(username=username, password=password,email=username)
                personalized_data = PersonalizedData(user=user) 
                personalized_data.save()
                personalized_dashboard_url = 'http://localhost:3000/fillform' 
                token, created = Token.objects.get_or_create(user=user)
                user = authenticate(request, username=username, password=password)
                login(request, user)
                return JsonResponse({'redirect_url': personalized_dashboard_url,'token': token.key})
                
            else:
                return Response({'message': 'Username already in use'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'message': 'Invalid request'}, status=status.HTTP_400_BAD_REQUEST)
@api_view(['POST'])
def save_personalized_data(request):
    if request.method == 'POST':
        serializer = PersonalizedDataSerializer(data=request.data)
        if serializer.is_valid():
            # Get the current user from the request
            user = request.user
            # Update or create personalized data for the user
            personalized_data, created = PersonalizedData.objects.update_or_create(
                user=user,
                defaults={
                    'bio': serializer.validated_data.get('bio', ''),
                    'profile_picture': serializer.validated_data.get('profile_picture', None),
                }
            )
            if not created:
                personalized_data.bio = serializer.validated_data.get('bio', '')
                personalized_data.profile_picture = serializer.validated_data.get('profile_picture', None)
                personalized_data.save()    
            return Response({'message': 'Personalized data saved successfully'})
        else:
            return Response(serializer.errors, status=400)
        
@api_view(['GET'])
@authentication_classes([TokenAuthentication])  # Use appropriate authentication method (Token, Session, etc.)
@permission_classes([IsAuthenticated])  # Ensure the user is authenticated
def get_user_data(request):
    user = request.user
    personalized_data = PersonalizedData.objects.filter(user=user).first()
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
        'email': user.email,  # Add other user data as needed
        # ...
    }
    return Response(response_data)