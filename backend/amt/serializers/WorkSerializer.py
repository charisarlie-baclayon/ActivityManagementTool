from rest_framework import serializers
from amt.models import Work


class WorkSerializer(serializers.ModelSerializer):

    class Meta:
        model = Work
        fields = ('__all__')