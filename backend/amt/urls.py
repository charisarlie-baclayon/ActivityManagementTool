from django.urls import path
from .views import ActivityView, ActivityDetailView 

urlpatterns = [
    path('activities/', ActivityView.as_view()),
    path('activities/<int:activity_id>/', ActivityDetailView.as_view()),
]