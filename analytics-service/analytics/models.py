# from django.db import models


# class PageView(models.Model):
#     url = models.CharField(max_length=2048)
#     timestamp = models.DateTimeField(auto_now_add=True)


from django.db import models
# Remove the following deprecated import:
# from django.contrib.postgres.fields import JSONField
# Use the updated JSONField import instead:
from django.db.models import JSONField

class Event(models.Model):
    EVENT_TYPES = (
        ('user_registration', 'User Registration'),
        ('user_login', 'User Login'),
        ('content_creation', 'Content Creation'),
        ('content_update', 'Content Update'),
        ('media_upload', 'Media Upload'),
        # Add more event types as needed
    )
    event_type = models.CharField(max_length=50, choices=EVENT_TYPES)
    timestamp = models.DateTimeField(auto_now_add=True)
    data = JSONField()  # To store arbitrary data about the event

    def __str__(self):
        return f"Event: {self.get_event_type_display()} at {self.timestamp}"

class PageView(models.Model):
    url = models.CharField(max_length=2048)
    timestamp = models.DateTimeField(auto_now_add=True)

    # This method should be indented to align with the start of the class definition
    def __str__(self):
        return f"PageView: {self.url} at {self.timestamp}"
