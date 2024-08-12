import registerForm from "../../assets/image/form.png";
import appointment from "../../assets/image/appointment.png";
import clinical from "../../assets/image/clinical.png";
import doctor from "../../assets/image/doctor.png";
import emergency from "../../assets/image/emergency.png";
import billing from "../../assets/image/billing.png";
import emr from "../../assets/image/emr.png";
import inPatient from "../../assets/image/inPatient.png";
import outPatient from "../../assets/image/outPatient.png";
import patient from "../../assets/image/patient.png";
import graph from "../../assets/image/graph.png";
import staffs from "../../assets/image/staffs.png";
import setting from '../../assets/image/setting.png'


import AssignmentSharpIcon from "@mui/icons-material/AssignmentSharp";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import { FaUserDoctor } from "react-icons/fa6";

import { TbReportMoney } from "react-icons/tb";

import PeopleIcon from "@mui/icons-material/People";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import VaccinesIcon from "@mui/icons-material/Vaccines";

import SettingsIcon from '@mui/icons-material/Settings';

export const data = [
  {
    department: "Patient Registration",
    img: registerForm,
    link: "/patientRegistration",
    icon: AssignmentSharpIcon,
    access:[ "receptionist", "admin"]
  },
  {
    department: "Appointment",
    img: appointment,
    link: "/appointment",
    icon: CalendarMonthIcon,
    access:["doctor", "receptionist","admin"]
  },
  {
    department: "Clinical Management",
    img: clinical,
    link: "/clinical",
    icon: VaccinesIcon,
    access:["doctor","admin"]
    
  },
  {
    department: "Doctor Information",
    img: doctor,
    link: "/doctors",
    icon: FaUserDoctor,
    access:["doctor", "receptionist","admin"]
  },
  

  {
    department: "Billing and Payment",
    img: billing,
    link: "/billing",
    icon: TbReportMoney,
    access:[ "receptionist","admin"]
  },
  {
    department: "Patient Information",
    img: patient,
    link: "/patients",
    icon: PeopleIcon,
    access:["doctor", "receptionist","admin"]
  },

  {
    department: "Statistic and Reports",
    img: graph,
    link: "/statistic",
    icon: LeaderboardIcon,
    access:["admin"]
  },
  {
    department:"Settings",
    img:setting,
    link:'/setting',
    icon:SettingsIcon,
    access:["admin"]
  }
];


export const homeAddress = [
  {
    name: "patientStreetAddress",
    label: "Street Address",
    id: "streetName",
    type: "text",
    required: true,
  },
  {
    name: "patientStreetAddressLine2",
    label: "Street Address",
    id: "streetAddressLine2",
    type: "text",
    required: false,
  },
  {
    name: "patientCity",
    label: "City",
    id: "city",
    type: "text",
    required: true,
  },
  {
    name: "patientState",
    label: "State/Province",
    id: "state",
    type: "text",
    required: true,
  },

  {
    name: "patientpostal",
    label: "Postal/Zip Code",
    id: "postal",
    type: "number",
    required: true,
  },
];
export const personalDetails = [
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
    label: "DOB",
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
    option: [
      {
        name: "Male",
      },
      {
        name: "Female",
      },
      {
        name: "Other",
      },
    ],
  },
  {
    name: "maritalStatus",
    label: "Marital Status",
    id: "maritalStatus",
    type: "select",
    required: true,
    option: [
      { name: "Single" },
      {
        name: "Married",
      },
      {
        name: "Divorcee",
      },
    ],
  },

  {
    name: "occupation",
    label: "Occupation",
    id: "occupation",
    type: "text",
    required: false,
  },
  {
    name: "language",
    label: "Language",
    id: "language",
    type: "text",
    required: false,
  },
  {
    name: "religion",
    label: "Religion",
    id: "religion",
    type: "text",
    required: false,
  },
  {
    name: "nationality",
    label: "Nationality",
    id: "nationality",
    type: "text",
    required: false,
  },
  {
    name: "email",
    label: "Email",
    id: "email",
    type: "text",
    required: true,
  },
];


export const emergencyContact = [
  {
    name: "emergencyfName",
    label: "First Name",
    id: "fnameE",
    type: "text",
    required: true,
  },
  {
    name: "emergencylName",
    label: "Last Name",
    id: "lnameE",
    type: "text",
    required: true,
  },
  {
    name: "emergencyRelation",
    label: "Relation",
    id: "relation",
    type: "text",
    required: false,
  },
  {
    name: "emergencyNumber",
    label: "Phone Number",
    id: "numberE",
    type: "number",
    required: true,
  },
  {
    name: "emergencyStreetAddress",
    label: "Street Address",
    id: "streetName",
    type: "text",
    required: false,
  },
  {
    name: "emergencyStreetAddressLine2",
    label: "Street Address line 2",
    id: "streetAddressLine2",
    type: "text",
    required: false,
  },
  {
    name: "emergencyCity",
    label: "City",
    id: "city",
    type: "text",
    required: false,
  },
  {
    name: "emergencyState",
    label: "State/Province",
    id: "state",
    type: "text",
    required: false,
  },

  {
    name: "emergencyPostal",
    label: "Postal/Zip Code",
    id: "postal",
    type: "number",
    required: false,
  },
];


