from django.db import models

class PageView(models.Model):
    url = models.CharField(max_length=2048)
    timestamp = models.DateTimeField(auto_now_add=True)
