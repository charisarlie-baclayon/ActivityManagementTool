from django.urls import path
from django.urls import re_path
from . import views

from amt.controllers import ActivityControllers

urlpatterns = [
    path('activities/', ActivityControllers.as_view({
        'post': 'create_activity',
        'get': 'get_all_activities',
    }), name='create-activity'),
    path('activities/<int:id>/', ActivityControllers.as_view({
        'get': 'get_activity_by_id',
        'put': 'update_activity',
        'delete': 'delete_activity'
    }), name='get-activity-by-id'),

    re_path('login', views.login),
    re_path('register', views.register),
    re_path('test_token', views.test_token),
   
]