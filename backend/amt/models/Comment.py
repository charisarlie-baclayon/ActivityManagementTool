from django.db import models
from amt.models.Activity import Activity

class Comment(models.Model):
    comment = models.TextField(max_length=10000)
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE)