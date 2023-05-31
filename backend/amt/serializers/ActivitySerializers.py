from rest_framework import serializers
from .models import Activity


class ActivitySerializers(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ['id', 'name', 'description', 'link', 'status']
        labels = {
            'name': 'Activity Name',
            'description': 'Description',
            'link': 'Attached Link',
            'status': 'Status',
        }
