from rest_framework import serializers
from amt.models import Template


class TemplateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Template
        fields = ('__all__')