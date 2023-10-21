from django.contrib import admin
from .models import PersonalizedData,Question
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('id', 'text')
    # Rest of your admin configuration...
    def __str__(self):
        return self.text

class PersonalizedDataAdmin1(admin.ModelAdmin):
    list_display = ('id', 'user', 'bio', 'profile_picture')
   
    search_fields = ('user__username',)  # Search by username of the associated user
    list_filter = ('user',)  # Add more filters if needed

    

admin.site.register(PersonalizedData, PersonalizedDataAdmin1)
admin.site.register(Question,QuestionAdmin)


class CustomUserAdmin(UserAdmin):
    # Add customizations to the user admin interface here
    list_display = ('username', 'email', 'last_login',  'is_staff', 'is_active')  # Example fields to display in the list view
    search_fields = ('username', 'email')  # Example fields to enable search in the admin panel

# Unregister the default UserAdmin and register the custom admin class for User model
admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)