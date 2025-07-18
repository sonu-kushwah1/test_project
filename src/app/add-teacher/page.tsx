"use client";
import React, { useState, useEffect } from "react";
import LayoutWrapper from "@/component/Layout";
import { Typography, Grid, Paper, Stack } from "@mui/material";
import BasicBreadcrumbs from "@/component/BreadCrumb";
import BasicInput from "@/component/custom-input";
import SelectInput from "@/component/selectTwo";
import CustomButton from "@/component/button";
import CustomTextarea from "@/component/TextArea";
import { useRouter, useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTeachers,
  createTeacher,
  updateTeacher,
} from "@/redux/slice/techerSlice";
import { AppDispatch, RootState } from "@/store";

const AddTeacher: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: users } = useSelector((state: RootState) => state.users);
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

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

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const {
      fname,
      lname,
      gender,
      email,
      phone,
      dob,
      address,
      city,
      univercity,
      degree,
    } = formData;

    if (
      !fname ||
      !lname ||
      !gender ||
      !email ||
      !phone ||
      !dob ||
      !address ||
      !city ||
      !univercity ||
      !degree
    ) {
      alert("Please fill all fields");
      return;
    }

     if (isEditing && editId !== null) {
      dispatch(
        updateTeacher({
          id: editId,
          ...formData,
          phone: Number(phone),
        })
      );
    } else {
      dispatch(
        createTeacher({
          fname: fname,
          lname: lname,
          gender: gender,
          email: email,
          dob: dob,
          address: address,
          city: city,
          univercity: univercity,
          degree: degree,
          phone: Number(phone),
        })
      );
    }

    // Optionally reset after submission
    handleReset();
  };

  const handleReset = () => {
    setFormData({
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
    setIsEditing(false);
    setEditId(null);
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
      <Typography variant="h5">Add New Teacher</Typography>
      <BasicBreadcrumbs currentPage="Add New Teacher" />
      <Paper className="innerWrapper" style={{ padding: "1.5rem", marginTop: "1rem" }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={3}>
              <BasicInput label="First Name*" inputType="text" name="fname" value={formData.fname} onChange={handleChange} />
            </Grid>
            <Grid size={3}>
              <BasicInput label="Last Name*" inputType="text" name="lname" value={formData.lname} onChange={handleChange} />
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
              <BasicInput label="Date Of Birth*" inputType="date" name="dob" value={formData.dob} onChange={handleChange} />
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
                <CustomButton type="submit" className="mainBtn" label="Save" />
                <CustomButton type="button" className="mainBtn lightBtn" label="Reset" onClick={handleReset} />
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </LayoutWrapper>
  );
};

export default AddTeacher;
