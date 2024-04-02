# analytics/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),  # Define a URL pattern for the root path
    path('endpoint/', views.log_page_view, name='analytics_endpoint'),
]
