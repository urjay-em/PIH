from django.contrib import admin
from .models import Client, Employee, Commission, Plot

admin.site.register(Client)
admin.site.register(Employee)
admin.site.register(Commission)
admin.site.register(Plot)
