// File: src/component/patients/Confirm.jsx
import React from "react";
import {
    Button,
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
    Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postNewPatient } from "../../utils/axiosHelper"; // Import the axios helper function

const Confirm = ({ formData }) => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Combine all the necessary data into a single object
        const combinedFormData = {
            ...formData.personalDetails,
            ...formData.homeAddress,
            ...formData.emergencyContact,
        };

        try {
            // Log the data before sending it
            console.log("Form data being submitted:", combinedFormData);

            const response = await postNewPatient(combinedFormData);

            // Log the full response for debugging
            console.log("Response from backend:", response);

            if (response.status === "success") {
                toast.success("Patient registration completed successfully!");
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            } else {
                // Show error message from the response
                toast.error(
                    response.message ||
                        "Failed to register patient. Please try again."
                );
                console.error("Error response:", response);
            }
        } catch (error) {
            console.error("Error during patient registration:", error);
            toast.error(
                "An unexpected error occurred. Please try again later."
            );
        }
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Review and Confirm
                    </Typography>
                    <Divider sx={{ mb: 2 }} />

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6">
                                Personal Details
                            </Typography>
                            <Typography variant="body2">
                                <strong>First Name:</strong>{" "}
                                {formData.personalDetails.fName}
                            </Typography>
                            <Typography variant="body2">
                                <strong>Middle Name:</strong>{" "}
                                {formData.personalDetails.mName || "N/A"}
                            </Typography>
                            <Typography variant="body2">
                                <strong>Last Name:</strong>{" "}
                                {formData.personalDetails.lName}
                            </Typography>
                            <Typography variant="body2">
                                <strong>Date of Birth:</strong>{" "}
                                {formData.personalDetails.dob}
                            </Typography>
                            <Typography variant="body2">
                                <strong>Gender:</strong>{" "}
                                {formData.personalDetails.gender}
                            </Typography>
                            <Typography variant="body2">
                                <strong>Marital Status:</strong>{" "}
                                {formData.personalDetails.maritalStatus}
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h6">Home Address</Typography>
                            <Typography variant="body2">
                                <strong>Street Address:</strong>{" "}
                                {formData.homeAddress.patientStreetAddress}
                            </Typography>
                            <Typography variant="body2">
                                <strong>Street Address Line 2:</strong>{" "}
                                {formData.homeAddress
                                    .patientStreetAddressLine2 || "N/A"}
                            </Typography>
                            <Typography variant="body2">
                                <strong>City:</strong>{" "}
                                {formData.homeAddress.patientCity}
                            </Typography>
                            <Typography variant="body2">
                                <strong>State:</strong>{" "}
                                {formData.homeAddress.patientState}
                            </Typography>
                            <Typography variant="body2">
                                <strong>Postal Code:</strong>{" "}
                                {formData.homeAddress.patientpostal}
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h6">
                                Emergency Contact
                            </Typography>
                            <Typography variant="body2">
                                <strong>Contact Name:</strong>{" "}
                                {formData.emergencyContact.contactName}
                            </Typography>
                            <Typography variant="body2">
                                <strong>Contact Phone:</strong>{" "}
                                {formData.emergencyContact.contactPhone}
                            </Typography>
                            <Typography variant="body2">
                                <strong>Relationship:</strong>{" "}
                                {formData.emergencyContact.relationship ||
                                    "N/A"}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Divider sx={{ my: 2 }} />

                    <Box display="flex" justifyContent="flex-end">
                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                            color="primary"
                        >
                            Confirm and Submit
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Confirm;
