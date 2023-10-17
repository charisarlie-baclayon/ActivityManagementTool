from django.db import models
from amt.models.Class import Class

class Team(models.Model):
    name = models.CharField(max_length=255)
    date_added = models.DateTimeField(auto_now=True, editable=False)
    class_team = models.ForeignKey(Class, on_delete=models.CASCADE)