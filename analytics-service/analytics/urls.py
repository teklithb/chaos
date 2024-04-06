
from django.urls import path
from .views import home, EventListCreate

urlpatterns = [
    path('', home, name='home'),
    #path('endpoint/', log_page_view, name='log_page_view'),

    path('events/', EventListCreate.as_view(), name='event-list-create'),
]