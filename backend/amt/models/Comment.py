from django.db import models
from amt.models.Activity import Activity

class Comment(models.Model):
    comment = models.TextField(max_length=10000)
    date_added = models.DateTimeField(auto_now=True)
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE)