import React, { useEffect, useState } from "react";
import MainLayout from "../../component/main/MainLayout";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";

import {
  postDepartment,
  getDepartmentList,
  updateDepartment,
  deleteDepartment,
} from "../../utils/axiosHelper";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Setting = () => {
  const [open, setOpen] = useState(false);
  const [department, setDepartment] = useState({});
  const [departmentList, setDepartmentList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setDepartment({});
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setDepartment({ ...department, department: e.target.value });
  };

  const handleAddDepartment = async () => {
    try {
      if (isEditing && department._id) {
        const response = await updateDepartment(department._id, department);
        if (response.status === "success") {
          toast.success("Department updated successfully");
        } else {
          console.error("Failed to update department:", response.message);
        }
      } else {
        const response = await postDepartment(department);
        if (response.status === "success") {
          toast.success("Department added successfully");
        } else {
          console.error("Failed to add department:", response.message);
        }
      }
      await getDepartment();
      handleClose();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const getDepartment = async () => {
    try {
      const response = await getDepartmentList();
      setDepartmentList(response.department);
    } catch (error) {
      console.error("Failed to fetch department list:", error);
    }
  };

  const handleEdit = (id) => {
    const departmentToEdit = departmentList.find((item) => item._id === id);
    setDepartment(departmentToEdit);
    setIsEditing(true);
    setOpen(true);
  };
  const handleDelete = async (id) => {
    const response = await deleteDepartment(id);
    response.status ==="success" ? 
    toast("Department updated successfully")
    :
    toast.error("Not able to delete. Something went wrong! ")
    getDepartment();
  };
  useEffect(() => {
    getDepartment();
  }, []);

  return (
    <MainLayout title={"Setting"}>
      <Box textAlign={"end"}>
        <Button
          variant="contained"
          sx={{ mt: 3, mb: 2, paddingX: 5 }}
          style={{ background: "var(--primary)" }}
          type="submit"
          onClick={handleOpen}
        >
          Add New Department
        </Button>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {isEditing ? "Edit Department" : "Add New Department"}
          </Typography>
          <TextField
            sx={{ width: "100%" }}
            value={department.department || ""}
            onChange={handleChange}
          />
          <Box textAlign={"end"}>
            <Button
              variant="contained"
              sx={{ mt: 3, mb: 2, paddingX: 5 }}
              style={{ background: "var(--primary)" }}
              onClick={handleAddDepartment}
            >
              {isEditing ? "Update" : "Add"}
            </Button>
          </Box>
        </Box>
      </Modal>
      <Box>
        {departmentList.map((item) => (
          <Paper
            key={item._id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              textTransform: "capitalize",
              p: 2,
              m: 1,
            }}
          >
            <Box>{item.department}</Box>
            <Box>
              <IconButton onClick={() => handleEdit(item._id)}>
                <EditIcon sx={{ color: "blue" }} />
              </IconButton>

              <IconButton onClick={() => handleDelete(item._id)}>
                <DeleteIcon sx={{ color: "red" }} />
              </IconButton>
            </Box>
          </Paper>
        ))}
      </Box>
    </MainLayout>
  );
};

export default Setting;
