# views.py
from django.contrib.auth import authenticate, login, logout
from rest_framework.authtoken.views import ObtainAuthToken
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from auth1.backends import CustomBackend 

from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from .models import PersonalizedData,Question
from .serializers import PersonalizedDataSerializer
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication,BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import PersonalizedData
from .serializers import PersonalizedDataSerializer
from django.views.decorators.csrf import csrf_exempt
import json


  # Require authentication for this view
@csrf_exempt  
@api_view(['POST'])
def login_view(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')
        type=request.data.get('type')
        if username and password:
            user = authenticate(request, username=username, password=password)
            if user is not None:
                # User is authenticated, generate an authentication token
                login(request,user)
                token, created = Token.objects.get_or_create(user=user)
                # Return the token and redirect URL in the response
                response_data = {
                    'token': token.key,
                    'redirect_url': 'http://localhost:3000/fillform',  # Replace with your desired redirect URL
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


@csrf_exempt
@authentication_classes([TokenAuthentication])  # Use appropriate authentication method (Token, Session, etc.)
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def logout_view(request):

  if request.method == 'POST':  
    
    Session.objects.all().delete()
    logout(request)
  
    return JsonResponse({'message': 'logoutdone'})

# views.py




@csrf_exempt
@api_view(['POST'])
def register_view(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')
        email=request.data.get('email')
        type=request.data.get('type')
        if username and password:
            User=get_user_model()
            if not User.objects.filter(username=email).exists():
                user = User.objects.create_user(username=email, password=password,email=email, user_type=type)
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
            bio = serializer.validated_data.get('bio', '')
            profile_picture = serializer.validated_data.get('profile_picture', None)
           

        
            # Update or create personalized data for the user
            defaults = {
                'bio': bio,
                
            }

            # Only update the profile_picture field if it is not an empty string
            if profile_picture is not None and profile_picture != '':
                defaults['profile_picture'] = profile_picture

            personalized_data, created = PersonalizedData.objects.update_or_create(
                user=user,
                defaults=defaults
            )

            return Response({'message': 'Personalized data saved successfully'})
        else:
            return Response(serializer.errors, status=400)
    else:
        return Response({'error': 'Invalid request method'}, status=400)
    
@api_view(['POST'])
def save_answers(request):
    if request.method == 'POST':
        serializer = PersonalizedDataSerializer(data=request.data)
        if serializer.is_valid():
            # Get the current user from the request
          
            answers = json.loads(request.POST.get('answer'))
            

        
            # Update or create personalized data for the user
            defaults = {
              
                'answers': answers,
            }
            personalized_data, created = PersonalizedData.objects.update_or_create(
                user=request.user,
                defaults=defaults
            )
            print(answers) 
            # Only update the profile_picture field if it is not an empty string
         

            return Response({'message': 'Answers saved successfully'})
        else:
            return Response(serializer.errors, status=400)
    else:
        return Response({'error': 'Invalid request method'}, status=400)    
        
@api_view(['GET'])
@authentication_classes([TokenAuthentication],)  # Use appropriate authentication method (Token, Session, etc.)
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
        'email': user.email,
           # Add other user data as needed
        # ...
    }
    return Response(response_data)

@api_view(['GET'])
def get_questions(request):
    questions = Question.objects.values_list('text', flat=True)
    return Response({'questions': list(questions)})



# Sentimental Analysis thing
from textblob import TextBlob
def analyze_sentiment(text):
    analysis = TextBlob(text)
    # Determine the polarity (positive, negative, or neutral) and subjectivity of the text
    polarity = analysis.sentiment.polarity
    subjectivity = analysis.sentiment.subjectivity
    return polarity, subjectivity
@api_view(['POST'])
def analyze_sentiment_api(request):
    if request.method == 'POST':
        text = request.data.get('text', '')
        polarity, subjectivity = analyze_sentiment(text)
        # You can format the response data as needed
        response_data = {
            'polarity': polarity,
            'subjectivity': subjectivity
        }
        return Response(response_data)

@api_view(['GET'])
def personalized_data_api(request):
    if request.method == 'GET':
        personalized_data = PersonalizedData.objects.all()
        serializer = PersonalizedDataSerializer(personalized_data, many=True)
        return Response(serializer.data)        
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
                 user, created = User.objects.get_or_create(email=user_email, defaults={'username': user_email, 'user_type':'FOUNDERS'})
                 
                # Create or retrieve a token for the user (if you are using token authentication)
          
            
            token, created = Token.objects.get_or_create(user=user)
             
            
            
            # Return authentication token
            return Response({
                'message': 'Successfully authenticated',
                'access_token': token.key,
            }, status=status.HTTP_200_OK)

        except ValueError:
            # Invalid token
          
            
       
            return Response({'error': 'Invalid access token'}, status=status.HTTP_401_UNAUTHORIZED)

        except Exception as e:
            # Handle other exceptions
            
          
            return Response({'error': str(e)+user_email}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
from .models import Notification
@api_view(['POST'])
def get_notifications(request):
    try:
        username = request.user
         # Get username from request data
        user_notifications = Notification.objects.filter(user__username=username)
       
        notifications_data = [{'text': notification.text,'sender':notification.sender} for notification in user_notifications]
        
        return Response({'notifications': notifications_data})
    except Exception as e:
        return Response({'error': str(e)})

@api_view(['POST'])
def create_notification(request):
    if request.method == 'POST':
        username = request.data.get('username')
        user1=request.user.username  

        notification_text = user1+request.data.get('notification_text')
       
        try:
            User=get_user_model()
            
            user_instance = User.objects.get(username=username)
            
            notification = Notification.objects.create(user=user_instance, text=notification_text,sender=user1)
           
            return Response({'message': 'Notification created successfully!'}, status=status.HTTP_201_CREATED)
       
       
       
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        return Response({'error': 'Invalid request method'}, status=status.HTTP_400_BAD_REQUEST)    
    
from django.core.exceptions import MultipleObjectsReturned

@api_view(['DELETE'])
def delete_notification(request):
    notification_text = request.data.get('text')  # Get notification text from request data
    
    try:
        # Attempt to get a single notification with the specified text owned by the user
        notification = Notification.objects.get(text=notification_text, user=request.user)
        notification.delete()
        
        return Response({'message': 'Notification deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
    
    except Notification.DoesNotExist:
        return Response({'message': 'Notification not found.'}, status=status.HTTP_404_NOT_FOUND)
    
    except MultipleObjectsReturned:
        # Handle the case where multiple notifications with the same text exist
        # You can choose how to handle this situation, for example, delete the first one found
        notification = Notification.objects.filter(text=notification_text, user=request.user).first()
        notification.delete()
        
        return Response({'message': 'Multiple notifications found. One deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
from publicuser.models import PersonalizedData1

@api_view(['POST'])
def tick_notification(request):
    if request.method == 'POST':
        User = get_user_model()
        username = request.data.get('username')
        
        try:
            # Get the user object based on the provided username
            user = User.objects.get(username=username)
            
            # Get PersonalizedData1 object associated with the user
            personalized_data1 = PersonalizedData1.objects.get(user=user)
            
            # Add the current user to the founders list in PersonalizedData1
            founders_list = personalized_data1.founders
            founders_list.append(request.user.username)
            personalized_data1.founders = founders_list
            personalized_data1.save()
            
            # Get PersonalizedData object associated with the current user
            personalized_data = PersonalizedData.objects.get(user=request.user)
            
            # Add the new founder to the investors list in PersonalizedData
            investors_list = personalized_data.investors
            investors_list.append(personalized_data1.user.username)
            personalized_data.investors = investors_list
            personalized_data.save()

            return Response({"message": "User added to founders and investors successfully."})

        except PersonalizedData1.DoesNotExist:
            return Response({'message': 'Personalized data not found for the user.'}, status=404)



from .serializers import  PersonalizedDataSerializer as PersonalizedData1Serializer  
@api_view(['GET'])
def get_founders(request):
    if request.method == 'GET':
        try:
            # Assuming you have a user object, you can get the associated PersonalizedData1 instance
            personalized_data1 = PersonalizedData.objects.get(user=request.user)

            # Serialize the founders list and send it in the response
            serializer = PersonalizedData1Serializer(personalized_data1)
            return Response(serializer.data)

        except PersonalizedData1.DoesNotExist:
            return Response({'message': 'Personalized data not found for the user.'}, status=400)        