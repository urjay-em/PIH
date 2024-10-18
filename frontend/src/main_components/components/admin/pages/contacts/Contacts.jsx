import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../../../theme";
import Header from "../../Header";
import { useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import EmployeeService from "../../../../../services/employee_service.jsx";


const parseDate = (dateString) => {
  console.log("Parsing date:", dateString); // Log the date string
  if (!dateString) return new Date(NaN);
  
  const parts = dateString.split('-');
  if (parts.length !== 3) return new Date(NaN);
  
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  
  const date = new Date(year, month, day);
  if (isNaN(date.getTime())) {
      return new Date(NaN);
  }
  
  return date;
};


const Employees = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [employees, setEmployees] = useState([]); // State for employee data
  const [loading, setLoading] = useState(true);   // Loading state
  const [error, setError] = useState(null);       // Error state


  useEffect(() => {
    EmployeeService.getAllEmployees()
      .then((response) => {
        console.log(response.data); // Log the API response here
        setEmployees(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load employee data");
        setLoading(false);
      });
  }, []);



  // Columns adjusted to match the updated employee model
  const columns = [
    { field: "userid", headerName: "User ID", flex: 1 }, // Auto-generated unique user ID
    { field: "first_name", headerName: "First Name", flex: 1 },
    { field: "last_name", headerName: "Last Name", flex: 1 },
    { field: "middle_name", headerName: "Middle Name", flex: 1, hide: true }, // Optional
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 0.5,
    },
    {
      field: "gender",
      headerName: "Gender",
      flex: 0.5,
    },
    {
      field: "contact_no",
      headerName: "Contact Number",
      flex: 1,
    },
    {
      field: "email_address",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "account_types",
      headerName: "Account Type",
      flex: 1,
      valueFormatter: ({ value }) => {
        switch (value) {
          case 'admin':
            return 'Admin';
          case 'agent':
            return 'Agent';
          case 'cashier':
            return 'Cashier';
          case 'info':
            return 'Information';
          default:
            return value;
        }
      },
    },
    {
      field: "hire_date",
      headerName: "Hire Date",
      flex: 1,
      valueFormatter: (params) => {
        console.log("Formatting date:", params.value); // Log the value
        const date = parseDate(params.value);
        return !isNaN(date.getTime()) ? date.toLocaleDateString() : 'Invalid Date';
      },
    },
    {
      field: "salary",
      headerName: "Salary (₱)",
      type: "number",
      flex: 1,
      valueFormatter: ({ value }) => {
        return value !== undefined && value !== null ? `$${value.toFixed(2)}` : '₱0.00';
      },
    },
    {
      field: "commission_amount",
      headerName: "Commission (₱)",
      type: "number",
      flex: 1,
      valueFormatter: ({ value }) => {
        return value !== undefined && value !== null ? `$${value.toFixed(2)}` : '₱0.00';
      },
    },
    
  ];

  if (loading) return <p>Loading employees...</p>;  // Display loading message
  if (error) return <p>{error}</p>;                 // Display error message if there's an error

  return (
    <Box m="20px">
      <Header
        title="EMPLOYEES"
        subtitle="List of Employees in the Database"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={employees}  // Use fetched employee data here
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row.userid} // Set the row ID to 'userid'
          disableSelectionOnClick
          autoHeight={true}              // Ensures the grid is responsive
        />
      </Box>
    </Box>
  );
};

export default Employees;
