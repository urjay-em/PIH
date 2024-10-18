from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Employee, Commission, Plot, Client
from .serializers import EmployeeSerializer, CommissionSerializer, PlotSerializer, ClientSerializer
from django.shortcuts import get_object_or_404


class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": "You have access!"})

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

    def perform_create(self, serializer):
        # Automatically generate userid using model logic during creation
        serializer.save()

    def get_object(self):
        # Override to use userid instead of the default pk
        return get_object_or_404(self.queryset, userid=self.kwargs['userid'])

    def update(self, request, *args, **kwargs):
        employee = self.get_object()
        serializer = self.get_serializer(employee, data=request.data)

        # Ensure the original userid remains unchanged
        serializer.initial_data['userid'] = employee.userid

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CommissionViewSet(viewsets.ModelViewSet):
    queryset = Commission.objects.all()
    serializer_class = CommissionSerializer

    def perform_create(self, serializer):
        # Save commission and allow the auto-calculation logic if necessary
        serializer.save()

    def update(self, request, *args, **kwargs):
        commission = self.get_object()
        serializer = self.get_serializer(commission, data=request.data)

        # Allow only certain fields to be updated
        if serializer.is_valid():
            serializer.save()  # Call save to persist the valid fields
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_object(self):
        return get_object_or_404(self.queryset, id=self.kwargs['pk'])

class PlotViewSet(viewsets.ModelViewSet):
    queryset = Plot.objects.all()
    serializer_class = PlotSerializer

    def perform_create(self, serializer):
        # Ensure the owner is selected from clients; should not be passed directly
        client_id = self.request.data.get('owner')
        if client_id:
            serializer.save(owner_id=client_id)
        else:
            return Response({"error": "Owner must be provided."}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        plot = self.get_object()
        serializer = self.get_serializer(plot, data=request.data)

        # Ensure the owner cannot be updated
        serializer.initial_data['owner'] = plot.owner.id

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_object(self):
        return get_object_or_404(self.queryset, plot_id=self.kwargs['pk'])
    


class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # Auto-generates userid using model logic
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None, *args, **kwargs):
        # Prevents updating the userid field
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()  # Save changes, but userid is unchanged
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)