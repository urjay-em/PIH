from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EmployeeViewSet, CommissionViewSet, PlotViewSet, ClientViewSet



router = DefaultRouter()
router.register(r'employees', EmployeeViewSet)
router.register(r'commissions', CommissionViewSet)
router.register(r'plots', PlotViewSet)
router.register(r'clients', ClientViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
