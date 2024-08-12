// File: src/page/patientInformation/PatientInformation.jsx

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
} from "@mui/material";
import { Link } from "react-router-dom";
import { getPatients } from "../../utils/axiosHelper";
import { toast } from "react-toastify";

const PatientInformation = () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const data = await getPatients();
                if (data.status === "success") {
                    setPatients(data.patients); // Assuming the API returns {status: "success", patients: [...] }
                } else {
                    toast.error("Failed to fetch patients.");
                }
            } catch (error) {
                toast.error("An error occurred while fetching patients.");
            }
        };

        fetchPatients();
    }, []);

    return (
        <MainLayout title="Patient Information">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Condition</TableCell>
                            <TableCell>Room</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {patients.length > 0 ? (
                            patients.map((patient) => (
                                <TableRow key={patient._id}>
                                    <TableCell>{patient._id}</TableCell>
                                    <TableCell>
                                        <Link
                                            style={{ textDecoration: "none" }}
                                            to={`/patient/${patient._id}`}
                                        >
                                            {`${patient.fName} ${patient.lName}`}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        {patient.condition || "N/A"}
                                    </TableCell>
                                    <TableCell>
                                        {patient.room || "N/A"}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    No patients found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </MainLayout>
    );
};

export default PatientInformation;
