from django.db import models
from django.utils import timezone
from .Course import Course

class Class(models.Model):
    name = models.CharField(max_length=100)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, null = True)  
    year_level = models.PositiveIntegerField()
    section = models.CharField(max_length=100)
    date_created = models.DateTimeField(default=timezone.now, editable=False)
    
    def __str__(self):
        return self.name