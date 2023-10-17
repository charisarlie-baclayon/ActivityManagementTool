from django.db import models
from amt.models.Activity import Activity

class Work(models.Model):
    work = models.TextField(max_length=10000)
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE)