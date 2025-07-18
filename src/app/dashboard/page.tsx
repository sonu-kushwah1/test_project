"use client";
import React from "react";
import { useTheme } from '@mui/material/styles';
import LayoutWrapper from "@/component/Layout";
import { Typography, Grid, Box, Stack } from "@mui/material";
import styled from "./styled.module.css";
import BasicBreadcrumbs from "@/component/BreadCrumb";

// Define a type for the dashboard data
interface DashboardItem {
  id: number;
  title: string;
  no: string;
}

const DashboardData: DashboardItem[] = [
  {
    id: 1,
    title: "Total Student",
    no: "805",
  },
  {
    id: 2,
    title: "New Admission",
    no: "125",
  },
  {
    id: 3,
    title: "Total Teacher",
    no: "15",
  },
];

export function genrateMetadata(){
  return{
    title:"Dashbaord",
    description:"dashboard description"
  }
}

const Dashboard: React.FC = () => {
  const theme = useTheme();
  return (
    <div>
      <head>
        <title>Dashboard</title>
      </head>
      <LayoutWrapper>
        <Typography variant="h5">Dashboard</Typography>
        <BasicBreadcrumbs currentPage="Dashboard" />

        <Grid container spacing={2}>
          {DashboardData.map((item) => (
           <Grid size={{ xs: 12, md: 4, lg:4 }} key={item.id}>
              <Box className={styled.dashboardCard} sx={{ backgroundColor: theme.palette.primary.main }}>
                <Typography variant="h6">{item.title}</Typography>
                <Typography>{item.no}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </LayoutWrapper>
    </div>
  );
};

export default Dashboard;

