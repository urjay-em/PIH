from django import forms
from .models import Employee, generate_employee_userid

class EmployeeForm(forms.ModelForm):
    class Meta:
        model = Employee
        fields = ['userid', 'first_name', 'last_name', 'middle_name', 'age', 'gender', 'address', 'contact_no', 'email_address', 'account_types', 'hire_date', 'salary', 'commission_amount']


