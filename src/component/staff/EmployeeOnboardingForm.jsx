import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Typography,
    TextField,
    Paper,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { addNewEmployee, getDepartmentList } from "../../utils/axiosHelper";

const initialState = {
    fName: "",
    mName: "",
    lName: "",
    dob: "",
    gender: "",
    phone: "",
    email: "",
    department: "",
    jobTitle: "",
    startDate: "",
    employmentType: "",
};

const staffDetails = [
    {
        name: "fName",
        label: "First Name",
        id: "fName",
        type: "text",
        required: true,
    },
    {
        name: "mName",
        label: "Middle Name",
        id: "mName",
        type: "text",
        required: false,
    },
    {
        name: "lName",
        label: "Last Name",
        id: "lName",
        type: "text",
        required: true,
    },
    {
        name: "dob",
        label: "Date of Birth",
        id: "dob",
        type: "date",
        required: true,
    },
    {
        name: "gender",
        label: "Gender",
        id: "gender",
        type: "select",
        required: true,
        options: [{ name: "Male" }, { name: "Female" }, { name: "Other" }],
    },
    {
        name: "phone",
        label: "Phone",
        id: "phone",
        type: "tel",
        required: true,
    },
    {
        name: "email",
        label: "Email",
        id: "email",
        type: "email",
        required: true,
    },
];

const jobDetails = [
    {
        name: "jobTitle",
        label: "Job Title",
        id: "jobTitle",
        type: "text",
        required: true,
    },
    {
        name: "startDate",
        label: "Start Date",
        id: "startDate",
        type: "date",
        required: true,
    },
    {
        name: "employmentType",
        label: "Employment Type",
        id: "employmentType",
        type: "select",
        required: true,
        options: [
            { name: "Part-time" },
            { name: "Full-time" },
            { name: "Casual" },
        ],
    },
];

const EmployeeOnboardingForm = () => {
    const [formData, setFormData] = useState(initialState);
    const [departmentList, setDepartmentList] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchDepartments = async () => {
            const departmentData = await getDepartmentList();
            setDepartmentList(departmentData.department);
        };
        fetchDepartments();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateDOB = (dob) => {
        const selectedDate = new Date(dob);
        const today = new Date();
        return selectedDate <= today;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate DOB
        if (!validateDOB(formData.dob)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                dob: "Date of Birth cannot be in the future.",
            }));
            return;
        }

        const employeeId = Date.now().toString().slice(-10);
        const response = await addNewEmployee({ ...formData, employeeId });

        setFormData(initialState);
        setErrors({});
    };

    return (
        <Box
            component={Paper}
            sx={{
                p: 4,
                m: "0 auto",
                maxWidth: "800px",
                boxShadow: 3,
                borderRadius: 2,
                backgroundColor: "background.paper",
            }}
        >
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
                Employee Details
            </Typography>
            <Grid container spacing={3}>
                {staffDetails.map(
                    ({ label, id, type, name, required, options }) => (
                        <Grid item xs={12} sm={6} key={id}>
                            {type === "select" ? (
                                <FormControl fullWidth required={required}>
                                    <InputLabel>{label}</InputLabel>
                                    <Select
                                        name={name}
                                        value={formData[name]}
                                        onChange={handleChange}
                                        label={label}
                                    >
                                        {options.map((option) => (
                                            <MenuItem
                                                key={option.name}
                                                value={option.name}
                                            >
                                                {option.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            ) : (
                                <TextField
                                    fullWidth
                                    required={required}
                                    label={label}
                                    name={name}
                                    value={formData[name]}
                                    onChange={handleChange}
                                    type={type}
                                    InputLabelProps={{
                                        shrink:
                                            type === "date" || !!formData[name],
                                    }}
                                    error={type === "date" && !!errors[name]}
                                    helperText={errors[name]}
                                />
                            )}
                        </Grid>
                    )
                )}

                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                        <InputLabel>Department</InputLabel>
                        <Select
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            label="Department"
                        >
                            {departmentList.map((dept) => (
                                <MenuItem
                                    key={dept._id}
                                    value={dept.department}
                                >
                                    {dept.department}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                {jobDetails.map(
                    ({ label, id, type, name, required, options }) => (
                        <Grid item xs={12} sm={6} key={id}>
                            {type === "select" ? (
                                <FormControl fullWidth required={required}>
                                    <InputLabel>{label}</InputLabel>
                                    <Select
                                        name={name}
                                        value={formData[name]}
                                        onChange={handleChange}
                                        label={label}
                                    >
                                        {options.map((option) => (
                                            <MenuItem
                                                key={option.name}
                                                value={option.name}
                                            >
                                                {option.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            ) : (
                                <TextField
                                    fullWidth
                                    required={required}
                                    label={label}
                                    name={name}
                                    value={formData[name]}
                                    onChange={handleChange}
                                    type={type}
                                    InputLabelProps={{
                                        shrink:
                                            type === "date" || !!formData[name],
                                    }}
                                />
                            )}
                        </Grid>
                    )
                )}
            </Grid>
            <Typography sx={{ color: "orange", py: 2 }}>
                Upon creating an employee, an email will be sent to them with
                login details and a temporary password.
            </Typography>
            <Box textAlign="right" mt={4}>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={handleSubmit}
                >
                    Create New Employee
                </Button>
            </Box>
        </Box>
    );
};

export default EmployeeOnboardingForm;
