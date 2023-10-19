from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from amt.models.Team import Team

class Student(AbstractUser):
    student_team = models.ForeignKey(Team, on_delete=models.CASCADE, null=True)
    groups = models.ForeignKey(Group, on_delete=models.CASCADE, related_name='student_users')
    user_permissions = models.ForeignKey(Permission, on_delete=models.CASCADE, related_name='student_permissions', null = True)
    email = models.EmailField(unique=True) 
    class Meta:
        verbose_name = 'Student'
        verbose_name_plural = 'Students'