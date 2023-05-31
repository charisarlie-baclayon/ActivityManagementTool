from django.db import models

# Create your models here.
class Activity(models.Model):
    STATUS_CHOICES = [
        ('INCOMPLETE', 'Incomplete'),
        ('COMPLETE', 'Complete'),
        ('IN_PROGRESS', 'In Progress'),
    ]

    name = models.CharField(max_length=200, default="", null=False)
    description = models.CharField(max_length=5000, default="", null=False)
    link = models.URLField(max_length=200, default="", null=True)
    status = models.CharField(max_length=100, choices=STATUS_CHOICES, default="INCOMPLETE")

    def __str__(self):
        return self.name + ' ' + self.description + ' ' + self.link + ' ' + self.status

    class Meta:
        db_table = 'Activities'