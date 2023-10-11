from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, CreateModelMixin, UpdateModelMixin, DestroyModelMixin
from rest_framework import status
from rest_framework.serializers import ValidationError

from amt.models import Activity
from amt.serializers import ActivitySerializer


class ActivityController(GenericViewSet, ListModelMixin, RetrieveModelMixin, CreateModelMixin, UpdateModelMixin, DestroyModelMixin):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer

    def get_all_activities(self, request):
        try:
            instances = self.get_queryset()
            serializer = ActivitySerializer(instances, many=True)
            return Response({"activities": serializer.data})
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def get_activity_by_id(self, request, id):
        try:
            instance = self.get_queryset().filter(id=id).first()
            serializer = ActivitySerializer(instance)
            if instance is None:
                return Response({"error": "Activity not found"}, status=status.HTTP_404_NOT_FOUND)
            return Response(serializer.data)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def create_activity(self, request):
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except ValidationError as e:
            return Response({"error": e.detail}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def update_activity(self, request, id):
        try:
            instance = self.get_queryset().filter(id=id).first()
            if instance is None:
                return Response({"error": "Activity not found"}, status=status.HTTP_404_NOT_FOUND)
            serializer = self.get_serializer(instance, data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            return Response(serializer.data)
        except ValidationError as e:
            return Response({"error": e.detail}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def delete_activity(self, request, id):
        try:
            instance = self.get_queryset().filter(id=id).first()
            if instance is None:
                return Response({"error": "Activity not found"}, status=status.HTTP_404_NOT_FOUND)
            self.perform_destroy(instance)
            return Response({"success": "Activity deleted"})
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
