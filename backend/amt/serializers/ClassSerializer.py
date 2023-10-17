from rest_framework import serializers
from amt.models import Class
from amt.serializers.TeamSerializer import TeamSerializer
from amt.serializers.ActivitySerializer import ActivitySerializer


class ClassSerializer(serializers.ModelSerializer):
    teams = TeamSerializer(many=True, read_only=True, source='team_set')
    activities = ActivitySerializer(many=True, read_only=True, source='activity_set')

    class Meta:
        model = Class
        fields = ('__all__')