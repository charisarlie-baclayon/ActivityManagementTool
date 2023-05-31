from django.urls import path
from .controllers import ActivityControllers

urlpatterns = [
    path('activities/', ActivityControllers.as_view({
        'post': 'create_activity',
        'get': 'get_all_activity',
    }), name='create-activity'),
    path('activity/<int:id>', ActivityControllers.as_view({
        'get': 'get_activity_by_id',
        'put': 'update_activity',
        'delete': 'delete_activity'
    }), name='get-activity-by-id'),
]