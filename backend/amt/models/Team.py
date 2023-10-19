from django.db import models
from amt.models.Class import Class
from amt.models.Student import Student

class Team(models.Model):
    name = models.CharField(max_length=255)
    date_added = models.DateTimeField(auto_now=True, editable=False)
    team_class = models.ForeignKey(Class, on_delete=models.CASCADE)
    #leader = models.ForeignKey(Student, on_delete=models.SET_NULL, null=True, blank=True, related_name='leading_teams')

    def members(self):
        return Student.objects.filter(team_id=self.pk)