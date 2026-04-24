from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('main_app.urls')),
    path('', include('about.urls')),
    path('', include('contacts.urls')),
    path('accounts/', include('usermanagement_24782004.urls')),
    path('admin/', admin.site.urls),
]