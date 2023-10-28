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
         path('api/save-answers/', views.save_answers, name='saveanswers'),
         path('api/analyze-sentiment/', views.analyze_sentiment_api, name='analyze-sentiment-api'),
         path('api/personalized-data/',views.personalized_data_api,name='personalized-data-api'),
         path('api/google-login/', views.GoogleLoginAPIView.as_view(), name='google-login'),
          path('api/google-login1/', publicuser_views.GoogleLoginAPIView.as_view(), name='google-login'),
           path('api/notifications/', views.get_notifications, name='get_notifications'),
            path('api/create-notifications/', views.create_notification, name='create_notifications'),
             path('api/get-events/', views.get_events, name='get_events'),
            path('api/create-events/', views.create_events, name='create_events'),
             path('api/delete-notification/', views.delete_notification, name='delete_notification'),
               path('api/delete-events/', views.delete_events, name='delete_event'),
              path('api/tick-notification/', views.tick_notification, name='tick_notification'),
               path('api/get-founders/', views.get_founders, name='ff'),

]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)