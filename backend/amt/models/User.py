from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    email = models.EmailField(unique= True)
    first_name = models.CharField(max_length=255, blank= True, null = True)
    last_name = models.CharField(max_length=255, blank= True, null = True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    date_created = models.DateTimeField(auto_now=True)
    date_updated = models.DateTimeField(auto_now=True)

    date_joined =None
    username = None
    
    STUDENT = 'student'
    TEACHER = 'teacher'

    ROLE_CHOICES = [
        (STUDENT, 'Student'),
        (TEACHER, 'Teacher'),
    ]

    role = models.CharField(max_length=15, choices=ROLE_CHOICES, default=STUDENT)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS =[
        'first_name',
        'last_name',
        'password'
    ]


    
                            
                            
