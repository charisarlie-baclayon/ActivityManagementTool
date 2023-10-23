from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission


class Teacher(AbstractUser):
    groups = models.ForeignKey(Group, on_delete=models.CASCADE, related_name='teacher_users')
    user_permissions = models.ManyToManyField(Permission, related_name='teachers_permissions', null =True)
    email = models.EmailField(unique=True) 
    class Meta:
        verbose_name = 'Teacher'
        verbose_name_plural = 'Teachers'
 