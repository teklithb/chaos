from django.http import JsonResponse, HttpResponse  # Import the HttpResponse class
from .models import PageView

def log_page_view(request):
    # Log the page view to the database
    PageView.objects.create(url=request.GET.get('url'))
    return JsonResponse({'status': 'success'})

def home(request):
    return HttpResponse("Welcome to the Analytics Service!")
