from rest_framework import serializers
from amt.models import Class, Course
from amt.serializers.TeamSerializer import TeamSerializer
from amt.serializers.ActivitySerializer import ActivitySerializer
from amt.serializers.CourseSerializer import CourseSerializer


class ClassSerializer(serializers.ModelSerializer):
    teams = TeamSerializer(many=True, read_only=True, source='team_set')
    #activities = ActivitySerializer(many=True, read_only=True, source='activity_set')
    #course = CourseSerializer()
    course =CourseSerializer(many=False, read_only = True)
 

    class Meta:
        model = Class
        fields = ('__all__')

    # class ClassSerializer(serializers.ModelSerializer):
    # teams = TeamSerializer(many=True, read_only=True, source='team_set')
    # activities = ActivitySerializer(many=True, read_only=True, source='activity_set')
    # course = CourseSerializer()
 

    # class Meta:
    #     model = Class
    #     fields = ['id', 'course', 'year-level', 'section']

    # def create(self, validated_data):
    #     course_id = validated_data.pop('course')

    #     try:
    #         course = Course.objects.get(pk=course_id)
    #     except Course.DoesNotExist:
    #         raise serializers.ValidationError("Course not found")

    #     # Create the Work instance with the associated Activity
    #     classes = Class(**validated_data)
    #     classes.course = course
    #     classes.save()
    #     return classes