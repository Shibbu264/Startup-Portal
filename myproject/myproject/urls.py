"""
URL configuration for myproject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from auth1 import views
from publicuser import views as publicuser_views
from django.conf import settings
from django.conf.urls.static import static
admin.site.site_header="Shivu's admin panel"
admin.site.site_title="Shivu was here!"
urlpatterns = [
    path('admin/', admin.site.urls),
  
    


    # ... other URL patterns
    path('api/login/', views.login_view, name='login'),
    path('api/logout/', views.logout_view, name='logout'),
      path('api/register/', views.register_view, name='register'),
       path('api/login1/', publicuser_views.login_view, name='login'),
    path('api/logout1/', publicuser_views.logout_view, name='logout'),
      path('api/register1/', publicuser_views.register_view, name='register'),
        path('api/save-personalized-data1/', publicuser_views.save_personalized_data, name='save_personalized_data'),
       path('api/get-user-data1/', publicuser_views.get_user_data, name='get_user_data'),
        path('api/get-authenticated-user-info1/', publicuser_views.get_authenticated_user_info, name='get_authenticated_user_info'),
       path('api/save-personalized-data/', views.save_personalized_data, name='save_personalized_data'),
       path('api/get-user-data/', views.get_user_data, name='get_user_data'),
        path('api/get-authenticated-user-info/', views.get_authenticated_user_info, name='get_authenticated_user_info'),
        path('api/get-questions/', views.get_questions, name='get_questions'),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)