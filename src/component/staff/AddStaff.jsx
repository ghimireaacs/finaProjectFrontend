import { Box, Button } from "@mui/material";
import React from "react";
import MainLayout from "../main/MainLayout";
import EmployeeOnboardingForm from "./EmployeeOnboardingForm";

const AddStaff = () => {
  return (
    <MainLayout title={"Employee Onboarding"}>

        <EmployeeOnboardingForm/>

    </MainLayout>
  );
};

export default AddStaff;
