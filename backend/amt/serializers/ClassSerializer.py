from rest_framework import serializers
from amt.models import Class
from amt.serializers.TeamSerializer import TeamSerializer


class ClassSerializer(serializers.ModelSerializer):
    teams = TeamSerializer(many=True, read_only=True, source='team_set')

    class Meta:
        model = Class
        fields = ('__all__')