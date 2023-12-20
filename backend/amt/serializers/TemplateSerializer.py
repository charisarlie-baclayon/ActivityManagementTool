from rest_framework import serializers
from amt.models import Template, Course
from amt.serializers.CourseSerializer import CourseSerializer


class TemplateSerializer(serializers.ModelSerializer):
    course = CourseSerializer(many=False, read_only = True)

    class Meta:
        model = Template
        fields = ('__all__')
        # fields = ('id', 'title', 'description')