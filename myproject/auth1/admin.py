from django.contrib import admin
from .models import PersonalizedData

class PersonalizedDataAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'bio', 'profile_picture')
    search_fields = ('user__username',)  # Search by username of the associated user
    list_filter = ('bio',)  # Add more filters if needed

admin.site.register(PersonalizedData, PersonalizedDataAdmin)
