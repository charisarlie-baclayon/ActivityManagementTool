from rest_framework import serializers
from .models import Activity

class ActivitySerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)

    class Meta:
        model = Activity
        fields = ['id', 'name', 'description', 'link', 'status']



from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User
        fields = ['id', 'username', 'password', 'email']