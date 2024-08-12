import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { CustomInput } from "../auth/CustomInput.jsx";
import { Button, InputLabel } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { updateProfile } from "../../utils/axiosHelper.js";
import {toast} from 'react-toastify'

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
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
    name: "phone",
    label: "Phone",
    id: "phone",
    type: "number",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    id: "email",
    type: "text",
    required: true,
  },
];

export default function EditProfile({
  open,
  handleClose,
  employeeDetails,
  getAllEmployee,
}) {
  const initialState = {
    fName: employeeDetails.fName,
    mName: employeeDetails.mName,
    lName: employeeDetails.lName,
    phone: employeeDetails.phone,
    email: employeeDetails.email,
    department: employeeDetails.department,
  };
  const [formData, setFormData] = useState(initialState);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleUpdate = async () => {
    const response = await updateProfile(employeeDetails._id, formData);
    response.status === "success"
      ? toast.success("Profile Information Changed!")
      : toast.error("Couldnot Change. Something went wrong!");
    getAllEmployee();
    handleClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{ color: "var(--secondary)" }}
            variant="h6"
            component="h2"
            py={2}
          >
            Edit Profile
          </Typography>
          <form>
            {staffDetails.map((input) => {
              return (
                <div key={input.name + input.id}>
                  <InputLabel>{input.label}</InputLabel>
                  <CustomInput
                    {...input}
                    value={formData[input.name]}
                    onChange={handleChange}
                  />
                </div>
              );
            })}
            <Box textAlign={"end"}>
              <Button
                variant="contained"
                style={{ background: "var(--primary)" }}
                onClick={handleUpdate}
              >
                Update
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
