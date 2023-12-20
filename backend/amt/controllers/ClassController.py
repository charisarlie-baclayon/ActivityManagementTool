from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, CreateModelMixin, UpdateModelMixin, DestroyModelMixin
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import action

from rest_framework.permissions import IsAuthenticated
from amt.permissions.permissions import IsTeacher

from amt.models import Class, Course
from amt.serializers import ClassSerializer


class ClassController(GenericViewSet, ListModelMixin, RetrieveModelMixin, CreateModelMixin, UpdateModelMixin, DestroyModelMixin):
    queryset = Class.objects.all()
    serializer_class = ClassSerializer

    def get_permissions(self):
        if self.action in ['create', 'retrieve', 'destroy', 'list', 'get_classes_by_section', 'get_classes_by_course']:
            return [IsAuthenticated(), IsTeacher()]
        else:
            return [IsAuthenticated()]
        
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            course_id = request.data.get('course', None)

            if course_id:
                try:
                    courseObject = Course.objects.get(pk=course_id)
                    classs = serializer.save(course=courseObject)
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                except Course.DoesNotExist:
                    return Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)
            else:
                return Response({'error': 'Course ID not provided'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['GET'])
    def get_classes_by_section(self, request):
        section = request.query_params.get('section', None)

        if not section:
            return Response({'detail': 'Please provide the "section" parameter in the query string.'}, status=status.HTTP_BAD_REQUEST)

        classes = Class.objects.filter(section=section)
        serializer = ClassSerializer(classes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['GET'])
    def get_classes_by_course(self, request):
        course_id = request.query_params.get('course_id', None)

        if not course_id:
            return Response({'detail': 'Please provide the "course_id" parameter in the query string.'}, status=status.HTTP_BAD_REQUEST)

        classes = Class.objects.filter(course=course_id)
        serializer = ClassSerializer(classes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)