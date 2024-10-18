import datetime
from django.db import models
from django.db.models import Max
from decimal import Decimal


def generate_employee_userid(role, branch):
    current_year = datetime.datetime.now().year
    last_user = Employee.objects.filter(userid__startswith=str(current_year)).aggregate(largest=Max('userid'))
    
    if last_user['largest']:
        last_id = int(last_user['largest'][5:8])  # Get the numeric part (e.g., 001 from 2024-001)
        new_id = last_id + 1
    else:
        new_id = 1

    # Role indicator (e.g., 'A' for agent, 'C' for cashier)
    role_indicator = role[0].upper()
    
    # Format the new ID as 'YYYY-XXX-RB', e.g., '2024-001-APPC'
    return f"{current_year}-{new_id:03d}-{role_indicator}{branch}"

class Employee(models.Model):
    id = models.AutoField(primary_key=True)
    userid = models.CharField(max_length=20, unique=True, editable=False)  # Auto-generated userid
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    middle_name = models.CharField(max_length=30, blank=True)
    age = models.PositiveIntegerField()
    gender = models.CharField(max_length=10, choices=[('M', 'Male'), ('F', 'Female')])
    address = models.TextField()
    contact_no = models.CharField(max_length=15)
    email_address = models.EmailField(unique=True)
    account_types = models.CharField(max_length=10, choices=[('admin', 'Admin'), ('agent', 'Agent'), ('cashier', 'Cashier'), ('info', 'Information')])
    hire_date = models.DateField()
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    commission_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    profile_picture = models.ImageField(upload_to='employee_pics/', null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.userid:
            self.userid = generate_employee_userid(self.account_types, 'PPC')  # Assuming 'PPC' is the branch code
        super(Employee, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Commission(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('received', 'Received'),
        ('reported', 'Reported'),
    ]
    
    id = models.AutoField(primary_key=True)
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='commissions')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date_awarded = models.DateField()
    description = models.TextField(null=True, blank=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    report_description = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.employee.userid}: {self.amount} - {self.status}"


class Plot(models.Model):
    STATUS_CHOICES = [
        ('occupied', 'Occupied'),
        ('vacant', 'Vacant'),
    ]

    plot_id = models.AutoField(primary_key=True)
    plot_code = models.CharField(max_length=10, unique=True)

    # Store latitude and longitude separately for precision
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)

    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='vacant')
    plot_type = models.CharField(max_length=30, choices=[
        ('stone', 'Stone Type'),
        ('lawn', 'Lawn Type'),
        ('valor', 'Valor Type'),
        ('mausoleum', 'Mausoleum'),
    ])
    #IMPORTANT! Please indicate the icons in the front end!!!

    price = models.DecimalField(max_digits=10, decimal_places=2)
    purchase_date = models.DateField(null=True, blank=True)

    owner = models.ForeignKey('Client', on_delete=models.CASCADE, related_name='plots')

    def __str__(self):
        return f"Plot {self.plot_code} - {self.status}"

    def save(self, *args, **kwargs):
        super(Plot, self).save(*args, **kwargs)


def generate_userid():
    current_year = datetime.datetime.now().year
    # Get the last inserted userid for the current year
    last_user = Client.objects.filter(userid__startswith=str(current_year)).aggregate(largest=Max('userid'))
    
    # Extract the numeric part after the year and increment it
    if last_user['largest']:
        last_id = int(last_user['largest'][4:7])  # Get the numeric part (e.g., 001 from 2024001)
        new_id = last_id + 1
    else:
        new_id = 1

    # Format the new ID as 'YYYYXXX-PPC', e.g., '2024001-PPC'
    return f"{current_year}{new_id:03d}-PPC"


class Client(models.Model):
    id = models.AutoField(primary_key=True)
    userid = models.CharField(max_length=15, unique=True, editable=False, default=generate_userid)  # Auto-generated userid
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    middle_name = models.CharField(max_length=30, blank=True)
    age = models.PositiveIntegerField()
    gender = models.CharField(max_length=10, choices=[('M', 'Male'), ('F', 'Female')])
    address = models.TextField()
    contact_no = models.CharField(max_length=15)
    email_address = models.EmailField(unique=True)
    account_type = models.CharField(max_length=10, choices=[('client', 'Client')])
    date_registered = models.DateField(auto_now_add=True)
    
    MODE_OF_PAYMENT_CHOICES = [
        ('cash', 'Cash'),
        ('installments', 'Installments'),
    ]
    mode_of_payment = models.CharField(max_length=20, choices=MODE_OF_PAYMENT_CHOICES, default='cash')
    
    balance_to_pay = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0.00'))
    
    # Plot assigned to the client
    plot = models.ForeignKey(Plot, on_delete=models.SET_NULL, null=True)

    # Agent who assisted in selling the plot
    agent = models.ForeignKey('Employee', on_delete=models.SET_NULL, null=True, related_name='clients')

    def save(self, *args, **kwargs):
        # Automatically update balance_to_pay based on plot price
        if self.plot:
            self.balance_to_pay = self.plot.plot_price
        
        super(Client, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.userid} - {self.first_name} {self.last_name}"


