from django.db import models
from amt.models.Team import Team

class Student(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)