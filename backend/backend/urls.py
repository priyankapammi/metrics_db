from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('metrics.urls')),
    path('auth/', obtain_auth_token),
]