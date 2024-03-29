from rest_framework import serializers
from ..models import User, Student
from ..serializers import StudentSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 
                  'first_name', 
                  'last_name', 
                  'password', 
                  'email', 
                  'role'] #role = student / teacher
        labels = {
            'first_name' : 'First Name',
            'last_name' : 'Last Name',
            'email' : 'Email',
            'password' : 'Password',
            'role' : 'Role',
        }
        extra_kwargs = {
            'password': {'write_only' : True},
            'role': {'allow_blank': False}
        }
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)
    password = serializers.CharField(max_length=128, write_only=True)

    def validate(self, data):
        email = data.get('email', None)
        password = data.get('password', None)

        if not email:
            raise serializers.ValidationError('Email is Required.')

        if not password:
            raise serializers.ValidationError('Password is Required.')

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError('Invalid Credentials.')

        if not user.check_password(password):
            raise serializers.ValidationError('Invalid Credentials')
        
        serializer_data = UserSerializer(user).data
        if user.role == 'student':
            student = Student.objects.get(user=user)
            serializer_data.update(StudentSerializer(student).data)

        return serializer_data
    
class SuperUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'is_staff', 'is_superuser']
        
        extra_kwargs = {
            'first_name': {'read_only': True, 'required': False},
            'last_name': {'read_only': True, 'required': False},
            'email': {'read_only': True, 'required': False},
            'is_staff': {'read_only': True, 'required': False},
            'is_superuser': {'read_only': True, 'required': False}
        }
