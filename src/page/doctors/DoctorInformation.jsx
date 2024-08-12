// DoctorInformation.jsx

import React, { useEffect, useState } from "react";
import MainLayout from "../../component/main/MainLayout";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
} from "@mui/material";
import { Link } from "react-router-dom";

import { getAllStaff } from "../../utils/axiosHelper";

const DoctorInformation = () => {
    const [doctors, setDoctors] = useState([]);

    const getDoctors = async () => {
        const response = await getAllStaff();
        if (response.status === "success") {
            setDoctors(
                response.employeeList.filter(
                    (employee) => employee.department.toLowerCase() === "doctor"
                )
            );
            console.log(
                response.employeeList.filter(
                    (employee) => employee.department.toLowerCase() === "doctor"
                )
            );
        } else {
            console.log("error fetching staffs");
        }
    };
    useEffect(() => {
        getDoctors();
    }, []);
    return (
        <MainLayout title="Doctor Information">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {doctors.map((doctor, i) => (
                            <TableRow key={doctor._id}>
                                <TableCell>{i + 1}</TableCell>
                                <TableCell>
                                    {doctor.fName} {doctor.lName}
                                </TableCell>
                                <TableCell>{doctor.email}</TableCell>
                                <TableCell>
                                    <Link
                                        style={{
                                            color: "var(--dark)",
                                            textDecoration: "none",
                                        }}
                                        to={`/doctor/${doctor._id}`}
                                    >
                                        View Profile
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </MainLayout>
    );
};

export default DoctorInformation;
