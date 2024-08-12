// File: EmergencyContact.jsx
import React, { useState } from "react";
import {
    Button,
    TextField,
    Box,
    FormControl,
    FormHelperText,
} from "@mui/material";

const EmergencyContact = ({ handleNext, formData }) => {
    const [emergencyContact, setEmergencyContact] = useState(
        formData.emergencyContact || {}
    );
    const [errors, setErrors] = useState({});

    const validate = () => {
        let tempErrors = {};
        if (!emergencyContact.contactName)
            tempErrors.contactName = "Contact Name is required";
        if (!emergencyContact.contactPhone) {
            tempErrors.contactPhone = "Contact Phone is required";
        } else if (isNaN(emergencyContact.contactPhone)) {
            tempErrors.contactPhone = "Contact Phone must be a number";
        }
        // Relationship is optional, so no validation needed here
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            handleNext({
                formName: "emergencyContact",
                values: emergencyContact,
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmergencyContact((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box>
                <FormControl
                    fullWidth
                    margin="normal"
                    error={Boolean(errors.contactName)}
                >
                    <TextField
                        name="contactName"
                        label="Contact Name"
                        value={emergencyContact.contactName || ""}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                    {errors.contactName && (
                        <FormHelperText>{errors.contactName}</FormHelperText>
                    )}
                </FormControl>

                <FormControl
                    fullWidth
                    margin="normal"
                    error={Boolean(errors.contactPhone)}
                >
                    <TextField
                        name="contactPhone"
                        label="Contact Phone"
                        value={emergencyContact.contactPhone || ""}
                        onChange={handleChange}
                        required
                        fullWidth
                        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    />
                    {errors.contactPhone && (
                        <FormHelperText>{errors.contactPhone}</FormHelperText>
                    )}
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <TextField
                        name="relationship"
                        label="Relationship"
                        value={emergencyContact.relationship || ""}
                        onChange={handleChange}
                        fullWidth
                    />
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

export default EmergencyContact;
