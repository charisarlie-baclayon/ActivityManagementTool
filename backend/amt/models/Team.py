from django.db import models

class Team(models.Model):
    name = models.CharField(max_length=255)
    date_added = models.DateTimeField(auto_now=True, editable=False)