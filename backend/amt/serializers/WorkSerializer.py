from rest_framework import serializers
from amt.models import Work
from amt.models import Activity

class WorkSerializer(serializers.ModelSerializer):
    activity_id = serializers.IntegerField()

    class Meta:
        model = Work
        fields = ['id', 'work', 'activity_id']

    def create(self, validated_data):
        activity_id = validated_data.pop('activity_id')

        try:
            activity = Activity.objects.get(pk=activity_id)
        except Activity.DoesNotExist:
            raise serializers.ValidationError("Activity not found")

        # Create the Work instance with the associated Activity
        work = Work(**validated_data)
        work.activity = activity
        work.save()
        return work
    # def to_representation(self, instance):
    #     data = super().to_representation(instance)
    #     # Include the activity_id in the response
    #     data['activity_id'] = instance.activity_id
    #     return data
