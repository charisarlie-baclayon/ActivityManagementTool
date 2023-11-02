from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, CreateModelMixin, UpdateModelMixin, DestroyModelMixin
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import action

from rest_framework.permissions import IsAuthenticated
from amt.permissions.permissions import IsTeacher

from amt.models import Work
from amt.models import Activity
from amt.serializers import WorkSerializer


class WorkController(GenericViewSet, ListModelMixin, RetrieveModelMixin, CreateModelMixin, UpdateModelMixin, DestroyModelMixin):
    queryset = Work.objects.all()
    serializer_class = WorkSerializer


    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Get the activity_id from the request data (you may want to validate this)
            activity_id = request.data.get('activity_id', None)

            if activity_id:
                try:
                    activity = Activity.objects.get(pk=activity_id)
                    work = serializer.save(activity=activity)
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                except Activity.DoesNotExist:
                    return Response({'error': 'Activity not found'}, status=status.HTTP_404_NOT_FOUND)
            else:
                return Response({'error': 'Activity ID not provided'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    @action(detail=False, methods=['GET'])
    def get_work_by_activity(self, request):
        activity_id = request.query_params.get('activity_id')

        if not activity_id:
            return Response({"error": "Activity ID not provided"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Retrieve all Work instances associated with the specified Activity
            work_instances = Work.objects.filter(activity=activity_id)
            serializer = WorkSerializer(work_instances, many=True)
            return Response(serializer.data)
        except Activity.DoesNotExist:
            return Response({"error": f"Activity with ID {activity_id} not found"}, status=status.HTTP_404_NOT_FOUND)