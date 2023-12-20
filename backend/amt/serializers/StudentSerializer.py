from rest_framework import serializers
from ..models import Student
from ..models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'role']

class StudentSerializer(serializers.ModelSerializer):
    user = UserSerializer()  # Use the UserSerializer for the user field

    class Meta:
        model = Student
        fields = ['id', 'user', 'student_team']
