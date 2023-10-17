from django.contrib import admin
from .models import Activity, Category, Template, Work, Comment, Class

# Register your models here.
admin.site.register(Activity)
admin.site.register(Category)
admin.site.register(Template)
admin.site.register(Work)
admin.site.register(Comment)
admin.site.register(Class)