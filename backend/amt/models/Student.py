from django.db import models
from .User import User as User
from amt.models.Team import Team

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name= 'student_user')
    student_team = models.ForeignKey(Team, on_delete=models.CASCADE, null=True)
    