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
