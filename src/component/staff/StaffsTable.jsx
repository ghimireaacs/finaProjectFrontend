import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteStaff, getAllStaff } from "../../utils/axiosHelper";
import { Link } from "react-router-dom";

const StaffsTable = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);

  const getAllEmployee = async () => {
    setIsLoading(true);
    const response = await getAllStaff();
    setIsLoading(false);
    setEmployeeList(response.employeeList);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async (id) => {
    const resposne = await deleteStaff(id);
    if (resposne.status === "success") {
      toast("employee deleted successfully");
      getAllEmployee();
    } else {
      toast.error("Not able to Delete. Something went wrong!");
    }
  };
  useEffect(() => {
    getAllEmployee();
  }, []);
  return (
    <>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Department</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Phone</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employeeList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((employee) => {
                  return (
                    <TableRow key={employee._id}>
                      <TableCell sx={{textTransform:"capitalize"}}>
                        {employee.fName} {employee.lName}
                      </TableCell>
                      <TableCell sx={{textTransform:"capitalize"}}>{employee.department}</TableCell>
                      <TableCell >{employee.email}</TableCell>
                      <TableCell >{employee.phone}</TableCell>
                      <TableCell>
                        <Link style={{color:"var(--dark)"}}  to={`/employee/${employee._id}`}>
                         View Profile
                        </Link>

                        
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[7, 10, 25]}
            component="div"
            count={employeeList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      )}
    </>
  );
};

export default StaffsTable;
