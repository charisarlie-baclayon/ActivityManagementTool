from rest_framework import serializers
from ..models import User


class StudentSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'password', 'role']
        extra_kwargs = {
            'password': {'write_only' : True},
            'role' : {'allow_blank' : False}
        }