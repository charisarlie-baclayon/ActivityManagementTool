from django.db import models
from amt.models.Category import Category
from amt.models.Course import Course

class Template(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=10000)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, null=True) 

    def __str__(self):
        return self.title
