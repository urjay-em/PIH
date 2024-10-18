import axiosInstance from './axios_server';

const EmployeeService = {
  getAllEmployees: () => axiosInstance.get('/employees/'), 
  getEmployeeById: (userid) => axiosInstance.get(`/employees/${userid}/`), 
  createEmployee: (employeeData) => axiosInstance.post('/employees/', employeeData), 
  updateEmployee: (userid, employeeData) => axiosInstance.put(`/employees/${userid}/`, employeeData), 
  deleteEmployee: (userid) => axiosInstance.delete(`/employees/${userid}/`), 
};

export default EmployeeService;
