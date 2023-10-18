# from rest_framework.response import Response
# from rest_framework.viewsets import GenericViewSet
# from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, CreateModelMixin, UpdateModelMixin, DestroyModelMixin
# from rest_framework import status
# from rest_framework.serializers import ValidationError

# from amt.models import Student
# from amt.serializers import StudentSerializer


# class StudentController(GenericViewSet, ListModelMixin, RetrieveModelMixin, CreateModelMixin, UpdateModelMixin, DestroyModelMixin):
#     queryset = Student.objects.all()
#     serializer_class = StudentSerializer


from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.viewsets import GenericViewSet
from rest_framework import status
from django.contrib.auth import login
from amt.models import Student
from amt.serializers import StudentSerializer
from rest_framework.authtoken.models import Token

class StudentController(GenericViewSet):
    serializer_class = StudentSerializer

    @action(detail=False, methods=['post'])
    def register(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            
            student = serializer.save()
            # user = Student.objects.get(email = request.data['email'])
            # user.set_password(request.data['passwprd'])
            # user.save()

            student.set_password(request.data['password'])
            student.save()
            
            # token = Token.objects.create(student=student)
            # response_data = {
            #     "token" : token.key,
            #     "user" : serializer.data
            # }

            login(request, student)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def login(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = Student.objects.filter(email=email).first()

        if user is not None and user.check_password(password):
            login(request, user)
            serializer = self.get_serializer(user)
            return Response(serializer.data)
        else:
            # Return a more informative response when login fails
            if user is None:
                return Response({'message': 'User with this email does not exist.'}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                return Response({'message': 'Incorrect password.'}, status=status.HTTP_401_UNAUTHORIZED)