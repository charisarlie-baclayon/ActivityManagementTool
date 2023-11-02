from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, CreateModelMixin, UpdateModelMixin, DestroyModelMixin
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import action

from rest_framework.permissions import IsAuthenticated
from amt.permissions.permissions import IsTeacher

from amt.models import Class
from amt.serializers import ClassSerializer


class ClassController(GenericViewSet, ListModelMixin, RetrieveModelMixin, CreateModelMixin, UpdateModelMixin, DestroyModelMixin):
    queryset = Class.objects.all()
    serializer_class = ClassSerializer

    def get_permissions(self):
        if self.action in ['create', 'retrieve', 'destroy', 'list', 'get_classes_by_section']:
            return [IsAuthenticated(), IsTeacher()]
        else:
            return [IsAuthenticated()]

    @action(detail=False, methods=['GET'])
    def get_classes_by_section(self, request):
        section = request.query_params.get('section', None)

        if not section:
            return Response({'detail': 'Please provide the "section" parameter in the query string.'}, status=status.HTTP_BAD_REQUEST)

        classes = Class.objects.filter(section=section)
        serializer = ClassSerializer(classes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)