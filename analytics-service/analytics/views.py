
# analytics/views.py
import requests
import subprocess
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from rest_framework import generics
from .models import Event, PageView
from .serializers import EventSerializer
import logging
import docker



# Existing PageView logging view
def home(request):
    other_service_urls = {
        'Service 1': 'http://localhost:3001/',
        'Service 2': 'http://localhost:8080/login',
        'Service 3': 'http://localhost:3002/upload',
    }
    other_service_data = {}
    for service_name, service_url in other_service_urls.items():
        try:
            response = requests.get(service_url)
            other_service_data[service_name] = response.text if response.status_code == 200 else f"Failed to fetch data from {service_url}. Status code: {response.status_code}"
        except requests.RequestException as e:
            other_service_data[service_name] = f"Error accessing {service_url}: {e}"

    container_logs = fetch_container_logs_for_all()
    print(container_logs)  # Add this line to print container logs

    return render(request, 'analytics/index.html', {
        'other_service_urls': other_service_urls,
        'other_service_data': other_service_data,
        'container_logs': container_logs,
    })

# New Event API views
class EventListCreate(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

def fetch_container_logs(container_name):
    try:
        client = docker.from_env()
        container = client.containers.get(container_name)
        logs = container.logs().decode('utf-8')
        print(f"Logs for container {container_name}: {logs}")  # Add this line to print container logs
        return logs
    except docker.errors.NotFound:
        return f"Container {container_name} not found."
    except docker.errors.APIError as e:
        print(f"Error fetching logs for {container_name}: {e}")  # Add this line to print API errors
        return f"Error fetching logs for {container_name}: {e}"



def fetch_container_logs_for_all():
    container_names = [
        'analytics-service_web_1',
        'laravel-grafana',
        'laravel-nginx',
        'laravel-prometheus',
        'laravel-mysql',
        'medea-service_app_1',
        'content_service_web_1'
    ]
    logs = {}
    for name in container_names:
        log = fetch_container_logs(name)
        print(f"Logs for container {name}: {log}")  # Add this line to print container logs
        logs[name] = log
    return logs


def r_service_view(request):
    return HttpResponse("This is the response from the r_service_view.")