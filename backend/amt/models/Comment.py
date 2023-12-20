from django.db import models
from amt.models.Activity import Activity
from amt.models.User import User  

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null = True)  
    comment = models.TextField(max_length=10000)
    date_added = models.DateTimeField(auto_now=True)
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE, null = True)
    
