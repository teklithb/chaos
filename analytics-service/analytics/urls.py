# # # analytics/urls.py
# # from django.urls import path
# # from . import views

# # urlpatterns = [
# #     path('', views.home, name='home'),  # Define a URL pattern for the root path
# #     path('endpoint/', views.log_page_view, name='analytics_endpoint'),
# # ]



# from django.urls import path
# from .views import home, log_page_view, EventListCreate
# from . import views


# urlpatterns = [
#     path('', home, name='home'),
#     path('endpoint/', log_page_view, name='analytics_endpoint'),
#     # New URL pattern for the Event API
#     path('events/', EventListCreate.as_view(), name='event-list-create'),
#     path('other_service_endpoint/', views.other_service_view, name='other_service'),

# ]

from django.urls import path
from .views import home, log_page_view, EventListCreate, r_service_view  # Import r_service_view

urlpatterns = [
    path('', home, name='home'),
    path('endpoint/', log_page_view, name='analytics_endpoint'),
    path('events/', EventListCreate.as_view(), name='event-list-create'),
    path('r_service_endpoint/', r_service_view, name='r_service'),  # Use r_service_view
]

