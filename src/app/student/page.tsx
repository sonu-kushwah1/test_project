"use client";
import React from "react";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; 
import { Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import BasicBreadcrumbs from "@/component/BreadCrumb";
import LayoutWrapper from "@/component/Layout";
import DataTable from "@/component/Table";
import Grid from "@mui/material/Grid";
import BasicInput from "@/component/custom-input";
import CustomButton from "@/component/button";

const columns: GridColDef[] = [
  { field: "id", headerName: "Id", width: 70 },
  { field: "fname", headerName: "First name", width: 130 },
  { field: "lname", headerName: "Last name", width: 130 },
  {
    field: "gender",
    headerName: "Gender",
    width: 90,
  },
  {
    field: "class",
    headerName: "Class",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 100,
    // valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
  {
    field: "section",
    headerName: "Section",
    width: 90,
  },
  {
    field: "address",
    headerName: "Address",
    width: 90,
  },
  {
    field: "dob",
    headerName: "DOB",
    width: 90,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 90,
  },
];

// const rows = [
//   {
//     id: 1,
//     lastName: "Snow",
//     firstName: "Jon",
//     gender: "Male",
//     class: "Nursery",
//     section: "A",
//     address: "Anand Nagar",
//     dob: "20-02-2020",
//     phone: "8358957395",
//   },
//   {
//     id: 2,
//     lastName: "Lannister",
//     firstName: "Cersei",
//     gender: "Female",
//     class: "Nursery",
//     section: "A",
//     address: "Anand Nagar",
//     dob: "20-02-2020",
//     phone: "8358957395",
//   },
//   {
//     id: 3,
//     lastName: "Stark",
//     firstName: "Arya",
//     gender: "Male",
//     class: "Nursery",
//     section: "A",
//     address: "Anand Nagar",
//     dob: "20-02-2020",
//     phone: "8358957395",
//   },
//   {
//     id: 4,
//     lastName: "Targaryen",
//     firstName: "Daenerys",
//     gender: "Male",
//     class: "Nursery",
//     section: "A",
//     address: "Anand Nagar",
//     dob: "20-02-2020",
//     phone: "8358957395",
//   },
// ];

function Student() {
  const router = useRouter(); 
  const [student, setStudent] = useState<any[]>([]);
  const [error, setError] = useState('');

const getAPI = async () => {
  try {
    const response = await axios.get('http://localhost:3001/student_list');

    // Add sequential IDs starting from 1 for table display
    const updatedData = response.data.map((item: any, index: number) => ({
      ...item,
      id: index + 1, 
    }));

    setStudent(updatedData);
  } catch (error) {
    setError('Error fetching student data');
    console.error(error);
  }
};


  useEffect(() => {
    getAPI(); 
  }, []);

  const remove = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/student_list/${id}`);
      getAPI();
    } catch (error) {
      console.error("Failed to delete student", error);
      setError("Failed to delete student");
    }
  };


  // if (error) return <p>{error}</p>;
  // if (!student) return <p>Loading...</p>;
  return (
    <LayoutWrapper>
      <Typography variant="h5" gutterBottom>
        Student
      </Typography>
      <BasicBreadcrumbs currentPage="Student" />
      {/*<Grid container spacing={2} mb={2}>
        <Grid size={3}>
          <BasicInput inputType="text" placeholder="Search by Roll No..."></BasicInput>
        </Grid>
        <Grid size={4}>
          <BasicInput inputType="text" placeholder="Search by Name..."></BasicInput>
        </Grid>
        <Grid size={3}>
          <BasicInput inputType="text" placeholder="Search by Class..."></BasicInput>
        </Grid>
        <Grid size={2}>
          <CustomButton className="mainBtn lightBtn" label="Search"/>
        </Grid>
      </Grid> */}
      {error ? (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      ) : !student ? (
        <Typography sx={{ mt: 2 }}>Loading...</Typography>
      ) : (
        <DataTable
        columns={columns}
        rows={student}
        checkboxSelection
        onView={(row) => router.push(`/studentDetails/${row.id}`)}
        onEdit={(row) => router.push(`/add-student/${row.id}`)}
        onDelete={(row) => remove(row.id)}
      />
      )}    
    </LayoutWrapper>
  );
}

export default Student;
