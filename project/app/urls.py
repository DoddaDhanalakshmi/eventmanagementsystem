from django.urls import path
from .views import *
urlpatterns=[
    path("api/customer/register/",customerregister),        #customer registration url"
    path("api/customer/login/",customerlogin),              # customer login url"
    path("api/owner/register/",register),                   #owner registration url
    path("api/owner/login/",login),                         #owner login url
    path("api/packages/register/",packages),                # owner packages ni registerd chesendhuku url
    path("api/check_service/",check_services),              # if the owner want to check the packge is there in packages table or not
    path("api/services/",get_services),                     #after adding servcies owner clcik th button to add servcies again it will stops that and showing whatever the add services before
    path("api/<str:event_name>/<str:package_type>/",package_services), # in this url checks if the services reradignto the packegs are there in pacakges table or not if not added their services if already there then it will show already servcie exist 
    path("api/packages/<str:eventype>/<str:package_type>/",get_packages), 
    path("api/packages/<int:owner_id>/<str:package_type>/<str:event_type>/delete",package_deletion), # if the owner want to delete the package 
    path("<str:event_name>/<str:package_type>/<int:id>/update/",update_services)                    # if the owner want to update the package 
   
] 