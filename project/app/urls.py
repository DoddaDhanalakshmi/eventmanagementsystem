from django.urls import path
from .views import register,login,packages,package_services,check_services,get_services
urlpatterns=[
    path("api/owner/register/",register),
    path("api/owner/login/",login),
    path("api/packages/register/",packages),
    path("api/check_service/",check_services),
    path("api/services/",get_services),
    path("<str:event_name>/<str:package_type>/",package_services),
   
]