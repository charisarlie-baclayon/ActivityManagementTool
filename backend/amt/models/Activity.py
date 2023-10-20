from django.db import models
from amt.models.Team import Team
from amt.models.Class import Class

class Activity(models.Model):
    title = models.CharField(max_length=100, default="", null=False)
    description = models.TextField(max_length=10000, default="", null=False)
    date_added = models.DateTimeField(auto_now_add=True, editable=False)
    submission_status = models.BooleanField(default=False)
    due_date = models.DateTimeField(null=True)
    activity_team = models.ForeignKey(Team, on_delete=models.CASCADE, null=True)
    #activity_class = models.ForeignKey(Class, on_delete=models.CASCADE, null=True)

    @classmethod
    def create_activity_from_template(cls, template):
        new_activity = cls(
            title=template.title,
            description=template.description,
            # Copy other fields from the template as needed
        )
        new_activity.save()
        return new_activity

    def __str__(self):
        return self.title
    
    # work_submission = models.TextField(max_length=10000, default="", null=True, blank=True)

    # TO-ADD
    # Attach files by teacher
    # Attach files by student work

    # def get_title(self):
    #     return self.title

    # def set_title(self, title):
    #     self.title = title

    # def get_description(self):
    #     return self.description

    # def set_description(self, description):
    #     self.description = description

    # def get_date_added(self):
    #     return self.date_added

    # def set_date_added(self, date_added):
    #     self.date_added = date_added

    # def get_submission_status(self):
    #     return self.submission_status

    # def set_submission_status(self, submission_status):
    #     self.submission_status = submission_status

    # def get_due_date(self):
    #     return self.due_date

    # def set_due_date(self, due_date):
    #     self.due_date = due_date

    # def get_work_submission(self):
    #     return self.work_submission

    # def set_work_submission(self, work_submission):
    #     self.work_submission = work_submission