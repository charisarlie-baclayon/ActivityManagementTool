from django.db import models
from amt.models.Activity import Activity

class Work(models.Model):
    work = models.TextField(max_length=10000)
    file_attachment = models.FileField(upload_to='work_submissions/', blank=True)
    date_added = models.DateTimeField(auto_now=True)
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE)