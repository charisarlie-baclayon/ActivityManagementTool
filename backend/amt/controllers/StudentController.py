from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, CreateModelMixin, UpdateModelMixin, DestroyModelMixin
from rest_framework import status, permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import action
from django.contrib.auth.models import Group
from amt.models import Student, Team
from amt.serializers import UserSerializer 
from amt.serializers import LoginSerializer as Login

class StudentController(GenericViewSet):
    serializer_class = StudentSerializer

class StudentController(GenericViewSet, ListModelMixin, RetrieveModelMixin, CreateModelMixin, UpdateModelMixin, DestroyModelMixin):
    queryset = Student.objects.all()
    serializer_class = UserSerializer
    authentication_classes = [JWTAuthentication]

    def get_permissions(self):
        #If Action is Create, Allow any
        if self.action == 'create':
            return [permissions.AllowAny()]
        #If Action is retrieve, update, partial_update, destroy then only authenticated user allowed
        elif self.action in ['retrieve', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated()]
        return super().get_permissions()

    # def create(self, request, *args, **kwargs):
    #     return super().create(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)
    
    
    def create(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid() and request.data['role'] == 'student':
            user = serializer.save()
            group, created = Group.objects.get_or_create(name = "Student")
            user.groups.add(group)
            Student.objects.create(user=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(methods=['POST'], detail=False)
    def login(self, request, *args, **kwargs):
        serializer = Login(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)
    
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)
    
    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)
    
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)
    
    @action(detail=True, methods=['POST'])
    def assign_to_team(self, request, pk=None):
        student = self.get_object()
        team_id = request.data.get('team_id')

        try:
            team = Team.objects.get(id=team_id)
        except Team.DoesNotExist:
            return Response({'error': 'Team does not exist'}, status=status.HTTP_400_BAD_REQUEST)

        student.student_team = team
        student.save()

        return Response({'message': 'Student assigned to the team successfully'}, status=status.HTTP_200_OK)


# from rest_framework.response import Response
# from rest_framework.decorators import action, authentication_classes, permission_classes
# from rest_framework.authentication import SessionAuthentication, TokenAuthentication
# from rest_framework.viewsets import GenericViewSet
# from rest_framework import status
# from rest_framework.permissions import IsAuthenticated
# from amt.serializers import StudentSerializer
# from rest_framework.authtoken.models import Token
# from django.contrib.auth import authenticate
# from django.contrib.auth.models import Group


# class StudentController(GenericViewSet):
#     serializer_class = StudentSerializer

#     @action(detail=False, methods=['post'])
#     def register(self, request):
#         serializer = self.get_serializer(data=request.data)
#         if serializer.is_valid():
            
#             student = serializer.save()
#             # user = Student.objects.get(email = request.data['email'])
#             # user.set_password(request.data['passwprd'])
#             # user.save()

#             student.set_password(request.data['password'])
#             student.save()
            
#             #incase groups will be used
#             group, created = Group.objects.get_or_create(name = 'Student')
#             student.groups.add(group)

#             # Create a token for the registered student
#             token, created = Token.objects.get_or_create(user=student)


#             response_data = {
#                 "token" : token.key,
#                 "user" : serializer.data
#             }

#             #login(request, student)
#             return Response(response_data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     @action(detail=False, methods=['post'])
#     def login(self, request):
#         email = request.data.get('email')
#         password = request.data.get('password')
#         user = authenticate(email=email, password=password)

#         if user is not None and user.check_password(password):
#             token, created = Token.objects.get_or_create(user=user)
#             serializer = self.get_serializer(user)

#             response_data = {
#                 "token" : token.key,
#                 "user": serializer.data
#             }
#             return Response(response_data, status=status.HTTP_200_Ok)
#         else:
#             # Return a more informative response when login fails
#             if user is None:
#                 return Response({'message': 'User with this email does not exist.'}, status=status.HTTP_401_UNAUTHORIZED)
#             else:
#                 return Response({'message': 'Incorrect password.'}, status=status.HTTP_401_UNAUTHORIZED)
    

#     @action(detail=False, methods=['get'])
#     def test_token(self, request):
#         if request.user.is_authenticated:
#             response_data = {
#                 "message": "Passed for {}".format(request.user.email)
#             }
#             return Response(response_data, status=status.HTTP_200_OK)
#         else:
#             return Response({'message': 'User is not authenticated.'}, status=status.HTTP_401_UNAUTHORIZED)
