"use client";
import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import DescriptionIcon from "@mui/icons-material/Description";
import InfoIcon from "@mui/icons-material/Info";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isSidebarOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen }) => {
  const pathname = usePathname();

  // Use one object to track open states
  const [openMenus, setOpenMenus] = useState({
    student: false,
    teacher: false,
    fees: false,
  });

  const toggleMenu = (menu: keyof typeof openMenus) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  return (
    <Box className={`sidebar ${isSidebarOpen ? "sidebar_toggle" : ""}`}>
      <List>
        <ListItem
          component={Link}
          href="/dashboard"
          sx={{ height: "40px" }}
          className={`menu-link ${pathname === "/dashboard" ? "active" : ""}`}
        >
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        {/* Student Menu */}
        <ListItem className="submenu menu-link" onClick={() => toggleMenu("student")}>
          <ListItemIcon><PeopleAltIcon /></ListItemIcon>
          <ListItemText primary="Student" />
          {openMenus.student ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={openMenus.student} timeout="auto" unmountOnExit className="submenu">
          <List component="div">
            <ListItem component={Link} href="/student" className={`menu-link ${pathname === "/student" ? "active" : ""}`} sx={{ height: "36px" }}>
              <ListItemIcon><InfoIcon /></ListItemIcon>
              <ListItemText primary="Student" />
            </ListItem>
            <ListItem component={Link} href="/add-student" className={`menu-link ${pathname === "/add-student" ? "active" : ""}`} sx={{ height: "36px" }}>
              <ListItemIcon><PeopleAltIcon /></ListItemIcon>
              <ListItemText primary="Add New Student" />
            </ListItem>
            <ListItem component={Link} href="/studentDetails" className={`menu-link ${pathname === "/studentDetails" ? "active" : ""}`} sx={{ height: "36px" }}>
              <ListItemIcon><PeopleAltIcon /></ListItemIcon>
              <ListItemText primary="Student Details" />
            </ListItem>
          </List>
        </Collapse>

        {/* Teacher Menu */}
        <ListItem className="submenu menu-link" onClick={() => toggleMenu("teacher")}>
          <ListItemIcon><PeopleAltIcon /></ListItemIcon>
          <ListItemText primary="Teacher" />
          {openMenus.teacher ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={openMenus.teacher} timeout="auto" unmountOnExit className="submenu">
          <List component="div">
            <ListItem component={Link} href="/teacher" className={`menu-link ${pathname === "/teacher" ? "active" : ""}`} sx={{ height: "36px" }}>
              <ListItemIcon><InfoIcon /></ListItemIcon>
              <ListItemText primary="Teacher" />
            </ListItem>
            <ListItem component={Link} href="/add-teacher" className={`menu-link ${pathname === "/add-teacher" ? "active" : ""}`} sx={{ height: "36px" }}>
              <ListItemIcon><PeopleAltIcon /></ListItemIcon>
              <ListItemText primary="Add New Teacher" />
            </ListItem>
            <ListItem component={Link} href="/teacher-details" className={`menu-link ${pathname === "/teacher-details" ? "active" : ""}`} sx={{ height: "36px" }}>
              <ListItemIcon><PeopleAltIcon /></ListItemIcon>
              <ListItemText primary="Teacher Details" />
            </ListItem>
          </List>
        </Collapse>

        {/* Fees Menu */}
        <ListItem className="submenu menu-link" onClick={() => toggleMenu("fees")}>
          <ListItemIcon><MonetizationOnIcon /></ListItemIcon>
          <ListItemText primary="Fees" />
          {openMenus.fees ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={openMenus.fees} timeout="auto" unmountOnExit className="submenu">
          <List component="div">
            <ListItem component={Link} href="/fees" className={`menu-link ${pathname === "/fees" ? "active" : ""}`} sx={{ height: "36px" }}>
              <ListItemIcon><InfoIcon /></ListItemIcon>
              <ListItemText primary="Fees List" />
            </ListItem>
            <ListItem component={Link} href="/admission-form" className={`menu-link ${pathname === "/admission-form" ? "active" : ""}`} sx={{ height: "36px" }}>
              <ListItemIcon><InfoIcon /></ListItemIcon>
              <ListItemText primary="Add Fees" />
            </ListItem>
          </List>
        </Collapse>

        {/* Other Menu Items */}
        <ListItem component={Link} href="/attendance" sx={{ height: "40px" }} className={`menu-link ${pathname === "/attendance" ? "active" : ""}`}>
          <ListItemIcon><DescriptionIcon /></ListItemIcon>
          <ListItemText primary="Attendance" />
        </ListItem>

        <ListItem component={Link} href="/notice" sx={{ height: "40px" }} className={`menu-link ${pathname === "/notice" ? "active" : ""}`}>
          <ListItemIcon><DescriptionIcon /></ListItemIcon>
          <ListItemText primary="Notice" />
        </ListItem>

        <ListItem component={Link} href="/setting" sx={{ height: "40px" }} className={`menu-link ${pathname === "/setting" ? "active" : ""}`}>
          <ListItemIcon><SettingsIcon /></ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
