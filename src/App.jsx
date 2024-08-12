import React from "react";
import Login from "./page/auth/Login";
import { Route, Routes } from "react-router-dom";
import SignUp from "./page/auth/SignUp";
import Dashboard from "./page/dashboard/Dashboard";
import Main from "./component/main/MainLayout";
import PatientRegistration from "./page/patientRegistration/PatientRegistration";
import Appointment from "./page/appointment/Appointment";
import Billing from "./page/billing/Billing";
import ClinicalManagement from "./page/clinical/ClinicalManagement";
import ElectronicMedicalRecord from "./page/emr/ElectronicMedicalRecord";
import DoctorInformation from "./page/doctors/DoctorInformation";
import InPatient from "./page/inPatient/InPatient";
import OutPatient from "./page/outPatient/OutPatient";
import Patients from "./page/patients/Patients";
import Statistics from "./page/statistics/Statistics";
import Emergency from "./page/emergency/Emergency";
import Staffs from "./page/staffs/Staffs";
import Rosters from "./page/rosters/Rosters";
import PublicRoute from "./component/protectedRoute/PublicRoute";
import ProtectedRoutes from "./component/protectedRoute/ProtectedRoutes";
import AddStaff from "./component/staff/AddStaff";
import Setting from "./page/setting/Setting";
import PatientProfile from "./page/patients/PatientProfile";
import EmployeeProfile from "./component/staff/EmployeeProfile";
import BookAppointment from "./page/appointment/BookAppointment";
import DoctorProfile from "./page/doctors/DoctorProfile";
import UnAuthorized from "./page/UnAuthorized";
import NotFound from "./page/NotFound";

const App = () => {
    return (
        <Routes>
            <Route
                path="/login"
                element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                }
            />
            <Route
                path="/signup"
                element={
                    <PublicRoute>
                        <SignUp />
                    </PublicRoute>
                }
            />
            <Route
                path="/"
                element={
                    <ProtectedRoutes
                        roles={["admin", "doctor", "receptionist"]}
                    >
                        <Dashboard />
                    </ProtectedRoutes>
                }
            />
            <Route
                path="/patientRegistration"
                element={
                    <ProtectedRoutes roles={["admin", "receptionist"]}>
                        <PatientRegistration />
                    </ProtectedRoutes>
                }
            />
            <Route
                path="/appointment"
                element={
                    <ProtectedRoutes
                        roles={["admin", "doctor", "receptionist"]}
                    >
                        <Appointment />
                    </ProtectedRoutes>
                }
            />

            <Route
                path="/bookAppointment"
                element={
                    <ProtectedRoutes roles={["admin", "receptionist"]}>
                        <BookAppointment />
                    </ProtectedRoutes>
                }
            />

            <Route
                path="/billing"
                element={
                    <ProtectedRoutes roles={["admin", "receptionist"]}>
                        <Billing />
                    </ProtectedRoutes>
                }
            />
            <Route
                path="/clinical"
                element={
                    <ProtectedRoutes roles={["admin", "doctor"]}>
                        <ClinicalManagement />
                    </ProtectedRoutes>
                }
            />

            <Route
                path="/doctors"
                element={
                    <ProtectedRoutes
                        roles={["admin", "doctor", "receptionist"]}
                    >
                        <DoctorInformation />
                    </ProtectedRoutes>
                }
            />

            <Route
                path="/patients"
                element={
                    <ProtectedRoutes
                        roles={["admin", "doctor", "receptionist"]}
                    >
                        <Patients />
                    </ProtectedRoutes>
                }
            />
            <Route
                path="/statistic"
                element={
                    <ProtectedRoutes roles={["admin"]}>
                        <Statistics />
                    </ProtectedRoutes>
                }
            />
            <Route path="/emergency" element={<Emergency />} />
            <Route
                path="/staffs"
                element={
                    <ProtectedRoutes roles={["admin"]}>
                        <Staffs />
                    </ProtectedRoutes>
                }
            />
            <Route
                path="/rosters"
                element={
                    <ProtectedRoutes roles={["admin"]}>
                        <Rosters />
                    </ProtectedRoutes>
                }
            />
            <Route
                path="/addStaff"
                element={
                    <ProtectedRoutes roles={["admin"]}>
                        <AddStaff />
                    </ProtectedRoutes>
                }
            />
            <Route
                path="/setting"
                element={
                    <ProtectedRoutes roles={["admin"]}>
                        <Setting />
                    </ProtectedRoutes>
                }
            />
            <Route
                path="/patient/:id"
                element={
                    <ProtectedRoutes
                        roles={["admin", "doctor", "receptionist"]}
                    >
                        <PatientProfile />
                    </ProtectedRoutes>
                }
            />
            <Route
                path="/employee/:id"
                element={
                    <ProtectedRoutes roles={["admin"]}>
                        <EmployeeProfile />
                    </ProtectedRoutes>
                }
            />
            <Route
                path="/doctor/:id"
                element={
                    <ProtectedRoutes>
                        <DoctorProfile
                            roles={["admin", "doctor", "receptionist"]}
                        />
                    </ProtectedRoutes>
                }
            />
            <Route
                path="/unauthorized"
                element={
                    <ProtectedRoutes>
                        <UnAuthorized />
                    </ProtectedRoutes>
                }
            />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default App;
