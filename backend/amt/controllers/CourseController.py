from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, CreateModelMixin, UpdateModelMixin, DestroyModelMixin
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import action

from rest_framework.permissions import IsAuthenticated
from amt.permissions.permissions import IsTeacher

from amt.models import Course
from amt.serializers import CourseSerializer


class CourseController(GenericViewSet, ListModelMixin, RetrieveModelMixin, CreateModelMixin, UpdateModelMixin, DestroyModelMixin):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    authentication_classes = [JWTAuthentication]

    def get_permissions(self):
        if self.action in ['create']:
            return [IsAuthenticated()]
        else:
            return [IsAuthenticated()]