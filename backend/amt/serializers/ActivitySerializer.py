from rest_framework import serializers
from amt.models import Activity


class ActivitySerializer(serializers.ModelSerializer):

    class Meta:
        model = Activity
        fields = ('__all__')

    # class Meta:
    #     model = Activity
    #     fields = ('title', 'description', 'date_added', 'submission_status', 'due_date', 'work_submission')
        
