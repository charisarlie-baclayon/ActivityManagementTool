from rest_framework import serializers
from amt.models import User
from amt.models import Comment, Activity

class UserCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name')  # Include the fields you want to expose

class ActivityCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ('id', 'title')
class CommentSerializer(serializers.ModelSerializer):
    activity = ActivityCommentSerializer()
    user = UserCommentSerializer()  # Serialize the user field

    class Meta:
        model = Comment
        fields = ('id', 'comment', 'date_added', 'activity', 'user')  # Include the user field

class CreateCommentSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()
    activity_id = serializers.IntegerField()
    comment = serializers.CharField(max_length=10000)

class CommentForActivitySerializer(serializers.ModelSerializer):
    activity = ActivityCommentSerializer()
    user = UserCommentSerializer()

    class Meta:
        model = Comment
        fields = ('id', 'comment', 'date_added', 'activity', 'user')