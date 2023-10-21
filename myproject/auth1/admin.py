from django.contrib import admin
from .models import PersonalizedData
from .models import Question

class QuestionAdmin(admin.ModelAdmin):
    list_display = ('id', 'text')
    # Rest of your admin configuration...
    def __str__(self):
        return self.text
admin.site.register(Question, QuestionAdmin)
class PersonalizedDataAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'bio', 'profile_picture')
   
    search_fields = ('user__username',)  # Search by username of the associated user
    list_filter = ('user',)  # Add more filters if needed
    

admin.site.register(PersonalizedData, PersonalizedDataAdmin)
