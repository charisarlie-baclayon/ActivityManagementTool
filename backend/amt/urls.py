from django.urls import path, include
from rest_framework.routers import DefaultRouter
from amt.controllers import ActivityController, CategoryController

router = DefaultRouter()
router.register(r'activities', ActivityController, basename='activity')
router.register(r'categories', CategoryController, basename='category')

urlpatterns = [
    # path('activities/', ActivityController.as_view({
    #     'post': 'create_activity',
    #     'get': 'get_all_activities',
    # }), name='create-activity'),
    # path('activities/<int:id>/', ActivityController.as_view({
    #     'get': 'get_activity_by_id',
    #     'put': 'update_activity',
    #     'delete': 'delete_activity'
    # }), name='get-activity-by-id'),
    #
    # the above code is manual, for when we use the controller's method
    #
    # the code below is automatic, using the routers class provided by rest_framework
    path('api/', include(router.urls))
]