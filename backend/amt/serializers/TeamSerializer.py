from rest_framework import serializers
from amt.models import Team
from amt.serializers.StudentSerializer import StudentSerializer


class TeamSerializer(serializers.ModelSerializer):
    students = StudentSerializer(many=True, read_only=True, source='student_set')
    class Meta:
        model = Team
        fields = ('__all__')