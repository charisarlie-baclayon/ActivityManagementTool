from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, CreateModelMixin, UpdateModelMixin, DestroyModelMixin
from rest_framework import status

from .models import Activity
from .serializers import ActivitySerializer


class ActivityControllers(GenericViewSet, ListModelMixin, RetrieveModelMixin, CreateModelMixin, UpdateModelMixin, DestroyModelMixin):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer

    @action(methods=['GET'], detail=False)
    def get_all_activities(self, request):
        instances = self.get_queryset()
        data = ActivitySerializer(instances, many=True).data
        return Response(data)
    
    @action(methods=['GET'], detail=True)
    def get_activity_by_id(self, request, pk=None):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
    @action(methods=['POST'], detail=False)
    def create_activity(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    @action(methods=['PUT'], detail=True)
    def update_activity(self, request, pk=None):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
    
    @action(methods=['DELETE'], detail=True)
    def delete_activity(self, request, pk=None):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({"success": "Activity deleted"})
