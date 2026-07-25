"""Top-level URL configuration."""

from django.urls import include, path

urlpatterns = [
    path("", include("details.urls")),
]
