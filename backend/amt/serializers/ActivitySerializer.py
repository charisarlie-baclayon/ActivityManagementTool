from rest_framework import serializers
from amt.models import Activity
from amt.serializers.CommentSerializer import CommentSerializer
from amt.serializers.WorkSerializer import WorkSerializer


class ActivitySerializer(serializers.ModelSerializer):

    works = WorkSerializer(many=True, read_only=True, source='work_set')
    comments = CommentSerializer(many=True, read_only=True, source='comment_set')

    class Meta:
        model = Activity
        fields = ('__all__')

    # class Meta:
    #     model = Activity
    #     fields = ('title', 'description', 'date_added', 'submission_status', 'due_date', 'work_submission')
        
