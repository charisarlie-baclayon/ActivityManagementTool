from django.urls import path, include
from rest_framework.routers import DefaultRouter

#import all controllers
from .controllers import *

from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView,
)
router = DefaultRouter()
router.register(r'activities', ActivityController, basename='activity')
router.register(r'categories', CategoryController, basename='category')
router.register(r'templates', TemplateController, basename='template')
router.register(r'works', WorkController, basename='work')
router.register(r'comments', CommentController, basename='comment')
router.register(r'classes', ClassController, basename='class')
router.register(r'teachers', TeacherController, basename='teacher')
router.register(r'teams', TeamController, basename='team')
router.register(r'students', StudentController, basename='student')

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
    path('api/', include(router.urls)),

    path('tokens/', include([
        path('acquire', TokensController.as_view(), name= 'acquire_token_pair'),
        path('refresh', TokenRefreshView.as_view(), name= 'refresh_token'),
        path('verify', TokenVerifyView.as_view(), name = 'verify_token'),
    ])),
]