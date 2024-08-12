// File: PersonalDetailsForm.jsx
import React, { useState } from "react";
import {
    Button,
    TextField,
    Box,
    FormControl,
    FormHelperText,
} from "@mui/material";
import dayjs from "dayjs";

const PersonalDetailsForm = ({ handleNext, formData }) => {
    const [personalDetails, setPersonalDetails] = useState(
        formData.personalDetails || {}
    );
    const [errors, setErrors] = useState({});

    const validate = () => {
        let tempErrors = {};
        if (!personalDetails.fName) tempErrors.fName = "First Name is required";
        if (!personalDetails.lName) tempErrors.lName = "Last Name is required";
        if (!personalDetails.dob) tempErrors.dob = "Date of Birth is required";
        else if (dayjs(personalDetails.dob).isAfter(dayjs()))
            tempErrors.dob = "Date of Birth cannot be in the future";
        if (!personalDetails.gender) tempErrors.gender = "Gender is required";
        if (!personalDetails.maritalStatus)
            tempErrors.maritalStatus = "Marital Status is required";
        if (!personalDetails.email) tempErrors.email = "Email is required";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log("Collected Personal Details:", personalDetails); // Debugging log
            handleNext({
                formName: "personalDetails",
                values: personalDetails,
            });
        } else {
            console.log("Validation errors:", errors); // Debugging log
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPersonalDetails((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box>
                <FormControl
                    fullWidth
                    margin="normal"
                    error={Boolean(errors.fName)}
                >
                    <TextField
                        name="fName"
                        label="First Name"
                        value={personalDetails.fName || ""}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                    {errors.fName && (
                        <FormHelperText>{errors.fName}</FormHelperText>
                    )}
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <TextField
                        name="mName"
                        label="Middle Name"
                        value={personalDetails.mName || ""}
                        onChange={handleChange}
                        fullWidth
                    />
                </FormControl>

                <FormControl
                    fullWidth
                    margin="normal"
                    error={Boolean(errors.lName)}
                >
                    <TextField
                        name="lName"
                        label="Last Name"
                        value={personalDetails.lName || ""}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                    {errors.lName && (
                        <FormHelperText>{errors.lName}</FormHelperText>
                    )}
                </FormControl>

                <FormControl
                    fullWidth
                    margin="normal"
                    error={Boolean(errors.dob)}
                >
                    <TextField
                        name="dob"
                        label="Date of Birth"
                        type="date"
                        value={personalDetails.dob || ""}
                        onChange={handleChange}
                        required
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    {errors.dob && (
                        <FormHelperText>{errors.dob}</FormHelperText>
                    )}
                </FormControl>

                <FormControl
                    fullWidth
                    margin="normal"
                    error={Boolean(errors.gender)}
                >
                    <TextField
                        name="gender"
                        label="Gender"
                        value={personalDetails.gender || ""}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                    {errors.gender && (
                        <FormHelperText>{errors.gender}</FormHelperText>
                    )}
                </FormControl>

                <FormControl
                    fullWidth
                    margin="normal"
                    error={Boolean(errors.maritalStatus)}
                >
                    <TextField
                        name="maritalStatus"
                        label="Marital Status"
                        value={personalDetails.maritalStatus || ""}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                    {errors.maritalStatus && (
                        <FormHelperText>{errors.maritalStatus}</FormHelperText>
                    )}
                </FormControl>

                <FormControl
                    fullWidth
                    margin="normal"
                    error={Boolean(errors.email)}
                >
                    <TextField
                        name="email"
                        label="Email"
                        value={personalDetails.email || ""}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                    {errors.email && (
                        <FormHelperText>{errors.email}</FormHelperText>
                    )}
                </FormControl>

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    Next
                </Button>
            </Box>
        </form>
    );
};

export default PersonalDetailsForm;
