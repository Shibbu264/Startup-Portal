from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import PersonalizedData, Question
from .models import CustomUser  # Import your CustomUser model

class QuestionAdmin(admin.ModelAdmin):
    list_display = ('id', 'text')
    # Rest of your admin configuration...
    def __str__(self):
        return self.text

class PersonalizedDataAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'bio', 'profile_picture')
    search_fields = ('user__username',)  # Search by username of the associated user
    list_filter = ('user',)  # Add more filters if needed

admin.site.register(PersonalizedData, PersonalizedDataAdmin)
admin.site.register(Question, QuestionAdmin)

class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'last_login', 'is_staff',  'user_type')  
    search_fields = ('username', 'email', 'user_type')  # Enable search by user_type
    list_filter = ('user_type',)  # Add filter by user_type
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'user_type')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    # Add other customizations as needed...

admin.site.register(CustomUser, CustomUserAdmin)
