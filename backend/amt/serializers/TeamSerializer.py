from rest_framework import serializers
from amt.models import Team
from amt.serializers.StudentSerializer import StudentSerializer
from amt.serializers.ActivitySerializer import ActivitySerializer


class TeamSerializer(serializers.ModelSerializer):
    #students = StudentSerializer(many=True, read_only=True, source='student_set')
    #activities = ActivitySerializer(many=True, read_only=True, source='activity_set')
    class Meta:
        model = Team
        fields = ('id', 'name', 'date_added', 'team_class')
