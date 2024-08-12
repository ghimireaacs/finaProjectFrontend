// File: src/page/patientRegistration/PatientRegistration.jsx
import React, { useState } from "react";
import MainLayout from "../../component/main/MainLayout";
import { Box } from "@mui/material";

import ProgressBar from "./ProgressBar";
import PersonalDetailsForm from "../../component/patients/PersonalDetailsForm";
import HomeAddress from "../../component/patients/HomeAddress";
import EmergencyContact from "../../component/patients/EmergencyContact";
import Confirm from "../../component/patients/Confirm";

const formList = [PersonalDetailsForm, HomeAddress, EmergencyContact, Confirm];

const PatientRegistration = () => {
    const [activeForm, setActiveForm] = useState(0);
    const [formData, setFormData] = useState({
        personalDetails: {},
        homeAddress: {},
        emergencyContact: {},
    });

    const ActiveFormComponent = formList[activeForm];

    const handleNext = (data) => {
        // Update formData with new data from the current step
        setFormData((prev) => ({
            ...prev,
            [data.formName]: data.values,
        }));

        // Move to the next step or submit the form
        if (activeForm < formList.length - 1) {
            setActiveForm(activeForm + 1);
        } else {
            // Final submission logic handled in the Confirm component
            console.log("Final submission data:", formData);
        }
    };

    return (
        <MainLayout title="Patient Registration">
            <Box
                width={"80%"}
                margin={"0 auto"}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <ProgressBar
                    activeForm={activeForm}
                    setActiveForm={setActiveForm}
                />
                <ActiveFormComponent
                    formData={formData}
                    handleNext={handleNext}
                    setActiveForm={setActiveForm}
                />
            </Box>
        </MainLayout>
    );
};

export default PatientRegistration;
