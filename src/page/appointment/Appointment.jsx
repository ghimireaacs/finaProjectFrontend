import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import MainLayout from "../../component/main/MainLayout";
import { getRoster } from "../../utils/rosterAxios";
import { getAllStaff } from "../../utils/axiosHelper";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const localizer = momentLocalizer(moment);

const Appointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [doctorShiftData, setDoctorShiftData] = useState([]);
    const [form, setForm] = useState({
        patientName: "",
        doctorId: "",
        doctorName: "",
        date: "",
        time: "",
        reason: "",
    });
    const [availableSlots, setAvailableSlots] = useState([]);

    const getRosterData = async () => {
        const response = await getRoster();
        const { result } = response.data;
        console.log(result);
        setDoctorShiftData(
            result.filter(
                (staff) => staff.department.toLowerCase() === "doctor"
            )
        );
    };

    const getDoctorList = async () => {
        const result = await getAllStaff();
        setDoctors(
            result.employeeList.filter(
                (item) => item.department.toLowerCase() === "doctor"
            )
        );
    };

    useEffect(() => {
        getDoctorList();
        getRosterData();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleDateChange = (e) => {
        setForm({ ...form, date: e.target.value });
        if (form.doctorId) {
            fetchAvailableSlots(form.doctorId, e.target.value);
        }
    };

    const handleDoctorChange = (e) => {
        const doctorId = e.target.value;
        const doctor = doctors.find((doc) => doc._id === doctorId);
        setForm({ ...form, doctorId, doctorName: doctor.name });
        if (form.date) {
            fetchAvailableSlots(doctorId, form.date);
        }
    };

    const fetchAvailableSlots = async (doctorId, date) => {
        const doctor = doctors.find((doc) => doc._id === doctorId);
        if (!doctor) return;

        const dayOfWeek = new Date(date).toLocaleDateString("en-US", {
            weekday: "long",
        });

        const roster = doctorShiftData.find(
            (shift) =>
                shift.staffName === doctor.name &&
                shift.startDate <= date &&
                shift.endDate >= date
        );

        if (!roster) return;

        const start = moment(`${date}T${roster.startTime}`);
        const end = moment(`${date}T${roster.endTime}`);
        const slots = [];

        while (start < end) {
            slots.push(start.format("HH:mm"));
            start.add(15, "minutes");
        }

        try {
            const response = await axios.post(
                "http://localhost:5000/api/check-availability",
                { doctorId, date }
            );
            const unavailableSlots = response.data
                .filter((appointment) => appointment.date === date)
                .map((app) => app.time);
            const available = slots.filter(
                (slot) => !unavailableSlots.includes(slot)
            );
            setAvailableSlots(available);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:5000/api/appointments", form)
            .then((response) =>
                setAppointments([...appointments, response.data])
            )
            .catch((err) => console.log(err));
    };

    const events = appointments.map((appointment) => ({
        title: `${appointment.patientName} with ${appointment.doctorName}`,
        start: new Date(`${appointment.date}T${appointment.time}:00`),
        end: new Date(
            new Date(`${appointment.date}T${appointment.time}:00`).getTime() +
                15 * 60000
        ),
    }));

    return (
        <MainLayout title={"Appointment"}>
            <Box>
                <Link to={"/bookAppointment"}>
                    <Box textAlign={"end"}>
                        <Button
                            variant="contained"
                            sx={{ mt: 3, mb: 2, paddingX: 5 }}
                            style={{ background: "var(--primary)" }}
                            type="submit"
                        >
                            Book Appointment
                        </Button>
                    </Box>
                </Link>
                <form onSubmit={handleSubmit}>
                    <input
                        name="patientName"
                        value={form.patientName}
                        onChange={handleChange}
                        placeholder="Patient Name"
                    />
                    <select
                        name="doctorId"
                        value={form.doctorId}
                        onChange={handleDoctorChange}
                    >
                        <option value="">Select Doctor</option>
                        {doctors.map((doctor) => (
                            <option key={doctor._id} value={doctor._id}>
                                {doctor.fName}
                            </option>
                        ))}
                    </select>
                    <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleDateChange}
                    />
                    <select
                        name="time"
                        value={form.time}
                        onChange={handleChange}
                    >
                        <option value="">Select Time</option>
                        {availableSlots.map((slot, index) => (
                            <option key={index} value={slot}>
                                {slot}
                            </option>
                        ))}
                    </select>
                    <input
                        name="reason"
                        value={form.reason}
                        onChange={handleChange}
                        placeholder="Reason for Visit"
                    />
                    <button type="submit">Book</button>
                </form>
                <h2>Appointments</h2>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500, margin: "50px" }}
                />
            </Box>
        </MainLayout>
    );
};

export default Appointment;
