import datetime
from rest_framework import authentication
from rest_framework import exceptions

class TokenAuthBackend(authentication.TokenAuthentication):

    def authenticate(self, request):
        user, token = super().authenticate(request)
        
        if not token:
            return None
        
        # Get the token's last used time
        last_used = token.last_used

        # Calculate the time difference
        time_diff = datetime.datetime.now() - last_used
        time_diff_seconds = time_diff.total_seconds()

        # Check if the time difference is greater than 1 hour
        if time_diff_seconds > 0:
            # If the time difference is greater than 1 hour, raise an exception
            raise exceptions.AuthenticationFailed('Token has expired')
        
        return (user, token)