from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class AuthTokenSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        #Claims HERE!!
        token['email'] = user.email


        return token