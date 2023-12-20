from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, CreateModelMixin, UpdateModelMixin, DestroyModelMixin
from rest_framework import status, permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import action
from django.contrib.auth.models import Group
from amt.models import Team, Class  # Import the Class model
from amt.serializers import TeamSerializer, ClassSerializer  # Import the ClassSerializer

class TeamController(GenericViewSet, ListModelMixin, RetrieveModelMixin, CreateModelMixin, UpdateModelMixin, DestroyModelMixin):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    authentication_classes = [JWTAuthentication]

    def get_permissions(self):
        # If Action is Create, allow any
        if self.action == 'create':
            return [permissions.IsAuthenticated()]  # Adjust permissions as needed
        # If Action is retrieve, update, partial_update, destroy, then only authenticated user allowed
        elif self.action in ['retrieve', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated()]
        return super().get_permissions()

    def create(self, request, *args, **kwargs):
        serializer = TeamSerializer(data=request.data)
        if serializer.is_valid():
            # Create the team
            team = serializer.save()

            # Check if the request data includes a 'class_id' to associate the team with a class
            class_id = request.data.get('class_id', None)
            if class_id is not None:
                try:
                    # Fetch the class based on the provided 'class_id'
                    class_instance = Class.objects.get(pk=class_id)
                    # Assign the team to the class
                    team.team_class = class_instance
                    team.save()

                except Class.DoesNotExist:
                    return Response({"error": "Class not found"}, status=status.HTTP_404_NOT_FOUND)

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
