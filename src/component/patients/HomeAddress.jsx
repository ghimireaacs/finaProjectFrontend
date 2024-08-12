// File: HomeAddress.jsx
import React, { useState } from "react";
import {
    Button,
    TextField,
    Box,
    FormControl,
    FormHelperText,
    MenuItem,
    Select,
    InputLabel,
} from "@mui/material";

const australianStates = [
    "New South Wales",
    "Victoria",
    "Queensland",
    "Western Australia",
    "South Australia",
    "Tasmania",
    "Australian Capital Territory",
    "Northern Territory",
];

const HomeAddress = ({ handleNext, formData }) => {
    const [homeAddress, setHomeAddress] = useState(formData.homeAddress || {});
    const [errors, setErrors] = useState({});

    const validate = () => {
        let tempErrors = {};
        if (!homeAddress.patientStreetAddress)
            tempErrors.patientStreetAddress = "Street Address is required";
        if (!homeAddress.patientCity)
            tempErrors.patientCity = "City is required";
        if (!homeAddress.patientState)
            tempErrors.patientState = "State is required";
        if (!homeAddress.patientpostal) {
            tempErrors.patientpostal = "Postal Code is required";
        } else if (isNaN(homeAddress.patientpostal)) {
            tempErrors.patientpostal = "Postal Code must be a number";
        }
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            handleNext({ formName: "homeAddress", values: homeAddress });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHomeAddress((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box>
                <FormControl
                    fullWidth
                    margin="normal"
                    error={Boolean(errors.patientStreetAddress)}
                >
                    <TextField
                        name="patientStreetAddress"
                        label="Street Address"
                        value={homeAddress.patientStreetAddress || ""}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                    {errors.patientStreetAddress && (
                        <FormHelperText>
                            {errors.patientStreetAddress}
                        </FormHelperText>
                    )}
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <TextField
                        name="patientStreetAddressLine2"
                        label="Street Address Line 2"
                        value={homeAddress.patientStreetAddressLine2 || ""}
                        onChange={handleChange}
                        fullWidth
                    />
                </FormControl>

                <FormControl
                    fullWidth
                    margin="normal"
                    error={Boolean(errors.patientCity)}
                >
                    <TextField
                        name="patientCity"
                        label="City"
                        value={homeAddress.patientCity || ""}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                    {errors.patientCity && (
                        <FormHelperText>{errors.patientCity}</FormHelperText>
                    )}
                </FormControl>

                <FormControl
                    fullWidth
                    margin="normal"
                    error={Boolean(errors.patientState)}
                >
                    <InputLabel>State</InputLabel>
                    <Select
                        name="patientState"
                        value={homeAddress.patientState || ""}
                        onChange={handleChange}
                        required
                        fullWidth
                    >
                        {australianStates.map((state, index) => (
                            <MenuItem key={index} value={state}>
                                {state}
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.patientState && (
                        <FormHelperText>{errors.patientState}</FormHelperText>
                    )}
                </FormControl>

                <FormControl
                    fullWidth
                    margin="normal"
                    error={Boolean(errors.patientpostal)}
                >
                    <TextField
                        name="patientpostal"
                        label="Postal Code"
                        value={homeAddress.patientpostal || ""}
                        onChange={handleChange}
                        required
                        fullWidth
                        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    />
                    {errors.patientpostal && (
                        <FormHelperText>{errors.patientpostal}</FormHelperText>
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

export default HomeAddress;
