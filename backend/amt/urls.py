from django.urls import path
from amt.controllers import ActivityController

urlpatterns = [
    path('activities/', ActivityController.as_view({
        'post': 'create_activity',
        'get': 'get_all_activities',
    }), name='create-activity'),
    path('activities/<int:id>/', ActivityController.as_view({
        'get': 'get_activity_by_id',
        'put': 'update_activity',
        'delete': 'delete_activity'
    }), name='get-activity-by-id'),
]