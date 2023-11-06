from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, CreateModelMixin, UpdateModelMixin, DestroyModelMixin
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import action

from rest_framework.permissions import IsAuthenticated
from amt.permissions.permissions import IsTeacher

from amt.models import Template, Course
from amt.serializers import TemplateSerializer


class TemplateController(GenericViewSet, ListModelMixin, RetrieveModelMixin, CreateModelMixin, UpdateModelMixin, DestroyModelMixin):
    queryset = Template.objects.all()
    serializer_class = TemplateSerializer

    authentication_classes = [JWTAuthentication]

    def get_permissions(self):
        if self.action in ['create']:
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
                    template = serializer.save(course=courseObject)
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                except Course.DoesNotExist:
                    return Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)
            else:
                template = serializer.save(course=None)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['GET'])
    def get_templates_by_course(self, request):
        course_id = request.query_params.get('course_id')

        if course_id is not None:
            try:
                # Fetch the course based on the provided 'course_id'
                course_instance = Course.objects.get(pk=course_id)

                # Get all templates associated with the specified course
                templates = Template.objects.filter(course=course_instance)
            except Course.DoesNotExist:
                return Response(
                    {"error": f"Course with ID {course_id} not found."},
                    status=status.HTTP_NOT_FOUND
                )
        else:
            # Fetch all templates with a null course
            templates = Template.objects.filter(course__isnull=True)

        serializer = TemplateSerializer(templates, many=True)

        return Response(serializer.data)

