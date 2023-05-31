from django.db import models

class Activity(models.Model):
    name = models.CharField(max_length=200, default="", null=False)
    description = models.CharField(max_length=5000, default="", null=False)
    link = models.URLField(max_length=200, default="", null=True)
    status = models.CharField(max_length=100, default="INCOMPLETE")

    def get_name(self):
        return self.name

    def get_description(self):
        return self.description

    def get_link(self):
        return self.link

    def get_status(self):
        return self.status

    def set_name(self, name):
        self.name = name

    def set_description(self, description):
        self.description = description

    def set_link(self, link):
        self.link = link

    def set_status(self, status):
        self.status = status