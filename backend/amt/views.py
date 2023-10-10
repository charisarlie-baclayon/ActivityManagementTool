from django.http import JsonResponse
from .models import Activity
from .serializers import ActivitySerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

class ActivityView(APIView):
    @staticmethod
    def get(request):
        activities = Activity.objects.all()
        serializer = ActivitySerializer(activities, many=True)
        return JsonResponse({"activities": serializer.data}, safe=False)

    @staticmethod
    def post(request):
        serializer = ActivitySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ActivityDetailView(APIView):
    @staticmethod
    def get(request, activity_id):
        activity = get_object_or_404(Activity, pk=activity_id)
        serializer = ActivitySerializer(activity)
        return Response(serializer.data)

    @staticmethod
    def put(request, activity_id):
        activity = get_object_or_404(Activity, pk=activity_id)
        serializer = ActivitySerializer(activity, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @staticmethod
    def delete(request, activity_id):
        activity = get_object_or_404(Activity, pk=activity_id)
        activity.delete()
        return Response(f"Activity {activity_id} deleted successfully", status=status.HTTP_204_NO_CONTENT)
    

##USER

from .serializers import UserSerializer
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.contrib.auth.models import Group
from rest_framework.decorators import api_view



@api_view(['POST'])
def login(request):
    user = get_object_or_404(User, username=request.data['username'])
    if not user.check_password(request.data['password']):
        return Response({"detail" : "Not found."} , status = status.HTTP_404_NOT_FOUND)
    
    # Get the user's groups
    user_groups = user.groups.all()

    # Create a list of group names
    group_names = [group.name for group in user_groups]


    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(instance=user)
    # Include the user's groups in the response data
    response_data = {
        "token": token.key,
        "user": serializer.data,
        "groups": group_names,  # Include the list of group names
    }
    return Response(response_data)
    



@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data = request.data)
    if serializer.is_valid():
        role = request.data.get('role') 
        serializer.save()

        # Determine the group based on the "role" value
        if role == 0:
            group_name = 'student'
        elif role == 1:
            group_name = 'teacher'
        else:
            group_name = 'student'  



        user = User.objects.get(username = request.data['username'])
         # Get or create the group based on the group name
        group, created = Group.objects.get_or_create(name=group_name)

        # Add the user to the determined group
        user.groups.add(group)

        # Hash the user's password
        user.set_password(request.data['password'])
        user.save()
        
        #Create token
        token = Token.objects.create(user=user)
        return Response({"token" : token.key, "user" : serializer.data})
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated


@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request):
    return Response("passed for {} " .format(request.user.email))
