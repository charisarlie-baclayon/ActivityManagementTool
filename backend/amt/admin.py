from django.contrib import admin
from .models import Activity, Category, Template, Work

# Register your models here.
admin.site.register(Activity)
admin.site.register(Category)
admin.site.register(Template)
admin.site.register(Work)