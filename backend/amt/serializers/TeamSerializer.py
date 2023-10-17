from rest_framework import serializers
from amt.models import Team


class TeamSerializer(serializers.ModelSerializer):

    class Meta:
        model = Team
        fields = ('__all__')