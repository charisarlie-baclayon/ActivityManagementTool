from django.db import models
from amt.models.Category import Category

class Template(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=10000)
    #category = models.ForeignKey(Category, on_delete=models.CASCADE)
    