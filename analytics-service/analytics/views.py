# # # from django.http import JsonResponse, HttpResponse  # Import the HttpResponse class
# # # from .models import PageView

# # # def log_page_view(request):
# # #     # Log the page view to the database
# # #     PageView.objects.create(url=request.GET.get('url'))
# # #     return JsonResponse({'status': 'success'})

# # # def home(request):
# # #     return HttpResponse("Welcome to the Analytics Service!")



# # from django.http import JsonResponse, HttpResponse
# # from rest_framework import generics
# # from .models import Event, PageView
# # from .serializers import EventSerializer
# # from django.http import HttpResponse


# # # Existing PageView logging view
# # def log_page_view(request):
# #     PageView.objects.create(url=request.GET.get('url'))
# #     return JsonResponse({'status': 'success'})

# # def home(request):
# #     return HttpResponse("Welcome to the Analytics Service!")

# # # New Event API views
# # class EventListCreate(generics.ListCreateAPIView):
# #     queryset = Event.objects.all()
# #     serializer_class = EventSerializer

# # def other_service_view(request):
# #     # Your view logic here
# #     return HttpResponse("This is the response from the other service view.")

# # views.py

# from django.http import JsonResponse, HttpResponse
# from rest_framework import generics
# from .models import Event, PageView
# from .serializers import EventSerializer

# # Existing PageView logging view
# def log_page_view(request):
#     PageView.objects.create(url=request.GET.get('url'))
#     return JsonResponse({'status': 'success'})

# def home(request):
#     return HttpResponse("Welcome to the Analytics Service!")





# # New Event API views
# class EventListCreate(generics.ListCreateAPIView):
#     queryset = Event.objects.all()
#     serializer_class = EventSerializer

# # Define r_service_view
# def r_service_view(request):
#     # Your view logic here
#     return HttpResponse("This is the response from the r_service_view.")



import requests
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from rest_framework import generics
from .models import Event, PageView
from .serializers import EventSerializer

# Existing PageView logging view
def log_page_view(request):
    PageView.objects.create(url=request.GET.get('url'))
    return JsonResponse({'status': 'success'})

def home(request):
    # Define the URLs of the other services
    other_service_urls = {
        'Service 1': 'http://localhost:3001/',
        'Service 2': 'http://localhost:8080/login',
        'Service 3': 'http://localhost:3002/upload'
    }
    
    # Initialize dictionary to hold data from other services
    other_service_data = {}
    
    # Retrieve data from each service
    for service_name, service_url in other_service_urls.items():
        try:
            response = requests.get(service_url)
            if response.status_code == 200:
                other_service_data[service_name] = response.text
            else:
                other_service_data[service_name] = f"Failed to fetch data from {service_url}. Status code: {response.status_code}"
        except requests.RequestException as e:
            other_service_data[service_name] = f"Error accessing {service_url}: {e}"

    return render(request, 'analytics/index.html', {'other_service_data': other_service_data})

# New Event API views
class EventListCreate(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

# Define r_service_view
def r_service_view(request):
    # Your view logic here
    return HttpResponse("This is the response from the r_service_view.")
