from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import PersonalizedData1
# Register your models here.
class PersonalizedDataAdmin(admin.ModelAdmin):
    list_display = ('id', 'user','profile_picture')
   
    search_fields = ('user__username',)  # Search by username of the associated user
    list_filter = ('user',)  # Add more filters if needed
admin.site.register(PersonalizedData1, PersonalizedDataAdmin)

