import React from "react";
import MainLayout from "../../component/main/MainLayout";
import StaffsTable from "../../component/staff/StaffsTable";
import AddStaff from "../../component/staff/AddStaff";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Staffs = () => {
  return (
    <MainLayout title={"Staff"}>
      <Box sx={{ minHeight: "10vh" }}>
        <Link to={'/addStaff'}>
          <Box textAlign={"end"}>
            <Button
              variant="contained"
              sx={{ mt: 3, mb: 2, paddingX: 5 }}
              style={{ background: "var(--primary)" }}
              type="submit"
            >
              Add New Staff
            </Button>
          </Box>
        </Link>
      </Box>

      <StaffsTable />
    </MainLayout>
  );
};

export default Staffs;
