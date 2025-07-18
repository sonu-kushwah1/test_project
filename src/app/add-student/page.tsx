"use client";
import React, { useState,useEffect } from "react";
import LayoutWrapper from "@/component/Layout";
import { Typography, Grid, Paper, Stack } from "@mui/material";
import BasicBreadcrumbs from "@/component/BreadCrumb";
import BasicInput from "@/component/custom-input";
import SelectInput from "@/component/selectTwo";
import CustomButton from "@/component/button";
import CustomTextarea from "@/component/TextArea";
import axios from "axios";
import { useRouter,useParams } from "next/navigation";

const Dashboard: React.FC = () => {
  const router = useRouter();

  const params = useParams();
  const id = params?.id;

  const [student, setStudent] = useState({
    fname: "",
    lname: "",
    gender: "",
    dob: "",
    roll_no: "",
    blood_group: "",
    religion: "",
    email: "",
    class: "",
    section: "",
    admission_id: "",
    phone: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setStudent((prev) => ({ ...prev, [name]: value }));
  };
  
  // ✅ Fetch existing student if editing
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3001/student_list/${id}`)
        .then((res) => setStudent(res.data))
        .catch((err) => console.error("Error fetching student:", err));
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        //  Update
        await axios.put(`http://localhost:3001/student_list/${id}`, student);
        alert("Student updated!");
      } else {
        //  Create
        await axios.post("http://localhost:3001/student_list", student);
        alert("Student added!");
      }
      router.push("/student");
    } catch (err) {
      console.error("Error submitting form", err);
    }
  };

  const genderOptions = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
  ];

  const bloodOptions = [
    { label: "A+", value: "A+" },
    { label: "B+", value: "B+" },
    { label: "O", value: "O" },
  ];

  const religionOptions = [
    { label: "Hindu", value: "Hindu" },
    { label: "Islam", value: "Islam" },
    { label: "Christian", value: "Christian" },
  ];

  const classOptions = [
    { label: "Nursery", value: "Nursery" },
    { label: "L.K.G", value: "L.K.G" },
    { label: "U.K.G", value: "U.K.G" },
  ];

  const sectionOptions = [
    { label: "M1", value: "M1" },
    { label: "S2", value: "S2" },
    { label: "D3", value: "D3" },
  ];

  return (
    <LayoutWrapper>
      <Typography variant="h5">Add New Student</Typography>
      <BasicBreadcrumbs currentPage="Add New Student" />
      <Paper className="innerWrapper" style={{ padding: "1.5rem", marginTop: "1rem" }}>
        <form onSubmit={handleSubmit}>
          {/* <Typography variant="h6" gutterBottom>
            Add New Students
          </Typography> */}
          <Grid container spacing={2}>
            <Grid size={3}>
              <BasicInput label="First Name*" inputType="text" name="fname" value={student.fname} onChange={handleChange} />
            </Grid>
            <Grid size={3}>
              <BasicInput label="Last Name*" inputType="text" name="lname" value={student.lname} onChange={handleChange} />
            </Grid>
            <Grid size={3}>
              <SelectInput label="Gender" value={student.gender} onChange={(val) => handleSelectChange("gender", val)} options={genderOptions} />
            </Grid>
            <Grid size={3}>
              <BasicInput label="Date Of Birth*" inputType="date" name="dob" value={student.dob} onChange={handleChange} />
            </Grid>
            <Grid size={3}>
              <BasicInput label="Roll No" inputType="text" name="roll_no" value={student.roll_no} onChange={handleChange} />
            </Grid>
            <Grid size={3}>
              <SelectInput label="Blood Group" value={student.blood_group} onChange={(val) => handleSelectChange("blood_group", val)} options={bloodOptions} />
            </Grid>
            <Grid size={3}>
              <SelectInput label="Religion*" value={student.religion} onChange={(val) => handleSelectChange("religion", val)} options={religionOptions} />
            </Grid>
            <Grid size={3}>
              <BasicInput label="Email" inputType="email" name="email" value={student.email} onChange={handleChange} />
            </Grid>
            <Grid size={3}>
              <SelectInput label="Class" value={student.class} onChange={(val) => handleSelectChange("class", val)} options={classOptions} />
            </Grid>
            <Grid size={3}>
              <SelectInput label="Section" value={student.section} onChange={(val) => handleSelectChange("section", val)} options={sectionOptions} />
            </Grid>
            <Grid size={3}>
              <BasicInput label="Admission ID" inputType="text" name="admission_id" value={student.admission_id} onChange={handleChange} />
            </Grid>
            <Grid size={3}>
              <BasicInput label="Phone" inputType="text" name="phone" value={student.phone} onChange={handleChange} />
            </Grid>
            <Grid size={12}>
              <CustomTextarea
                label="Address"
                placeholder="Write here..."
                minRows={3}
                name="address"
                value={student.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={12}>
              <Stack direction="row" spacing={2}>
                <CustomButton type="submit" className="mainBtn" label="Save" />
                <CustomButton
                  type="button"
                  className="mainBtn lightBtn"
                  label="Reset"
                  onClick={() =>
                    setStudent({
                      fname: "",
                      lname: "",
                      gender: "",
                      dob: "",
                      roll_no: "",
                      blood_group: "",
                      religion: "",
                      email: "",
                      class: "",
                      section: "",
                      admission_id: "",
                      phone: "",
                      address: "",
                    })
                  }
                />
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </LayoutWrapper>
  );
};

export default Dashboard;
