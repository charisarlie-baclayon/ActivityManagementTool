from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, CreateModelMixin, UpdateModelMixin, DestroyModelMixin
from rest_framework import status

from amt.models import Activity
from amt.serializer import ActivitySerializers


class ActivityControllers(GenericViewSet, ListModelMixin, RetrieveModelMixin, CreateModelMixin, UpdateModelMixin, DestroyModelMixin):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializers

    @action(methods=['GET'], detail=False)
    def get_all_activities(self, request):
        # instances = self.get_queryset()
        # data = ActivitySerializers(instances, many=True).data
        # return JsonResponse({"activities": data}, safe=False)
        instance = self.get_queryset()
        data = []
        for activities in instance:
            data.append(ActivitySerializers(activities).data)
        return Response({"activities": data})
    
    @action(methods=['GET'], detail=True)
    def get_activity_by_id(self, request, id):
        # instance = self.get_object()
        # serializer = self.get_serializer(instance)
        # return Response(serializer.data)
        instance = self.get_queryset().filter(id=id).first()
        if instance is None:
            return Response({"error": "Activity not found"}, status=status.HTTP_404_NOT_FOUND)
        return Response(ActivitySerializers(instance).data)
    
    @action(methods=['POST'], detail=False)
    def create_activity(self, request):
        # serializer = self.get_serializer(data=request.data)
        # serializer.is_valid(raise_exception=True)
        # self.perform_create(serializer)
        # return Response(serializer.data, status=status.HTTP_201_CREATED)
        data = request.data
        newActivity = Activity()
        newActivity.set_name(data['name'])
        newActivity.description(data['description'])
        newActivity.link(data['link'])
        newActivity.save()
        serializer = ActivitySerializers(newActivity)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    @action(methods=['PUT'], detail=True)
    def update_activity(self, request, id):
        # instance = self.get_object()
        # serializer = self.get_serializer(instance, data=request.data)
        # serializer.is_valid(raise_exception=True)
        # self.perform_update(serializer)
        # return Response(serializer.data)
        data = request.data
        instance = self.get_queryset().filter(id=id).first()
        if instance is None:
            return Response({"error": "Activity not found"}, status=status.HTTP_404_NOT_FOUND)
        instance.set_name(data['name'])
        instance.set_description(data['description'])
        instance.set_link(data['link'])
        instance.save()
        serializer = ActivitySerializers(instance)
        return Response(serializer.data)
    
    @action(methods=['DELETE'], detail=True)
    def delete_activity(self, request, id):
        # instance = self.get_object()
        # self.perform_destroy(instance)
        # return Response({"success": "Activity deleted"})
    
        instance = self.get_queryset().filter(id=id).first()
        if instance is None:
            return Response({"error": "Activity not found"}, status=status.HTTP_404_NOT_FOUND)
        instance.delete()
        return Response({"success": "Activity deleted"})
