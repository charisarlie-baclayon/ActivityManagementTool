from rest_framework_simplejwt.views import TokenObtainPairView

from amt.serializers import AuthTokenSerializer

class TokensController(TokenObtainPairView):
    serializer_class = AuthTokenSerializer
