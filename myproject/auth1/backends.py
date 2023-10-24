from django.contrib.auth.backends import ModelBackend
from oauth2_provider.models import AccessToken

class CustomBackend(ModelBackend):
    def authenticate(self,request, access_token):
          # Extract access_token from keyword arguments
        
        if access_token:
            try:
                token = AccessToken.objects.get(token=access_token)
                # Authenticate the user associated with the token
               
           
                return token.user
            except AccessToken.DoesNotExist:
                # If the token does not exist, return None for authentication failure
                return None
        else:
            # If access_token is not provided, return None for authentication failure
            return None
