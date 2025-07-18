"use client";
import React, { useState, useEffect } from "react";
import LayoutWrapper from "@/component/Layout";
import { Typography, Grid, Paper, Stack } from "@mui/material";
import BasicBreadcrumbs from "@/component/BreadCrumb";
import BasicInput from "@/component/custom-input";
import SelectInput from "@/component/selectTwo";
import CustomButton from "@/component/button";
import CustomTextarea from "@/component/TextArea";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTeacherById,
  updateTeacher,
} from "@/redux/slice/techerSlice";
import { AppDispatch, RootState } from "@/store";

const EditTeacher: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { id } = useParams();
  const teacherId = Number(id); // Ensure number
  const { singleTeacher, loading,successMessage } = useSelector((state: RootState) => state.teachers);

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    gender: "",
    email: "",
    phone: "",
    dob: "",
    address: "",
    city: "",
    univercity: "",
    degree: "",
  });

  // Fetch user on load
  useEffect(() => {
    if (teacherId) {
      dispatch(fetchTeacherById(teacherId));
    }
  }, [dispatch, teacherId]);

  // Populate form once data is available
  useEffect(() => {
    if (singleTeacher) {
      setFormData({
        fname: singleTeacher.fname || "",
        lname: singleTeacher.lname || "",
        gender: singleTeacher.gender || "",
        email: singleTeacher.email || "",
        phone: String(singleTeacher.phone) || "",
        dob: singleTeacher.dob || "",
        address: singleTeacher.address || "",
        city: singleTeacher.city || "",
        univercity: singleTeacher.univercity || "",
        degree: singleTeacher.degree || "",
      });
    }
  }, [singleTeacher]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (teacherId) {
      dispatch(updateTeacher({ id: teacherId, ...formData, phone: Number(formData.phone) }));
    }
  };

  const genderOptions = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
  ];

  const cityOptions = [
    { label: "Gwalior", value: "gwalior" },
    { label: "Murena", value: "murena" },
    { label: "Datiya", value: "datiya" },
  ];

  const univercityOptions = [
    { label: "Jiwaji Univercity", value: "Jiwaji Univercity" },
    { label: "MCRPV Univercity", value: "MCRPV Univercity" },
    { label: "RGPV Univercity", value: "RGPV Univercity" },
  ];

  const degreeOptions = [
    { label: "B.Ed", value: "B.Ed" },
    { label: "D.Ed", value: "D.Ed" },
    { label: "B.A", value: "B.A" },
  ];

  return (
    <LayoutWrapper>
      <Typography variant="h5">Update Teacher</Typography>
      <BasicBreadcrumbs currentPage="Update Teacher" />
      <Paper className="innerWrapper" style={{ padding: "1.5rem", marginTop: "1rem" }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={3}>
              <BasicInput label="First Name" inputType="text" name="fname" value={formData.fname} onChange={handleChange} />
            </Grid>
            <Grid size={3}>
              <BasicInput label="Last Name" inputType="text" name="lname" value={formData.lname} onChange={handleChange} />
            </Grid>
            <Grid size={3}>
              <SelectInput label="Gender" value={formData.gender} onChange={(val) => handleSelectChange("gender", val)} options={genderOptions} />
            </Grid>
            <Grid size={3}>
              <BasicInput label="Email" inputType="email" name="email" value={formData.email} onChange={handleChange} />
            </Grid>
            <Grid size={3}>
              <BasicInput label="Phone" inputType="text" name="phone" value={formData.phone} onChange={handleChange} />
            </Grid>
            <Grid size={3}>
              <BasicInput label="Date of Birth" inputType="date" name="dob" value={formData.dob} onChange={handleChange} />
            </Grid>
            <Grid size={3}>
              <SelectInput label="City" value={formData.city} onChange={(val) => handleSelectChange("city", val)} options={cityOptions} />
            </Grid>
            <Grid size={3}>
              <SelectInput label="Univercity" value={formData.univercity} onChange={(val) => handleSelectChange("univercity", val)} options={univercityOptions} />
            </Grid>
            <Grid size={3}>
              <SelectInput label="Degree" value={formData.degree} onChange={(val) => handleSelectChange("degree", val)} options={degreeOptions} />
            </Grid>
            <Grid size={12}>
              <CustomTextarea label="Address" placeholder="Write here..." minRows={3} name="address" value={formData.address} onChange={handleChange} />
            </Grid>
            <Grid size={12}>
              <Stack direction="row" spacing={2}>
                <CustomButton type="submit" className="mainBtn" label="Update" />
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </LayoutWrapper>
  );
};

export default EditTeacher;
