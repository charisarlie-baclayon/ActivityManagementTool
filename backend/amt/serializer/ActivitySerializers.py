from rest_framework import serializers
from amt.models import Activity


class ActivitySerializers(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)

    class Meta:
        model = Activity
        fields = ['id', 'name', 'description', 'link', 'status']
        
