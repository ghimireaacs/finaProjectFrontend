import React, { useState } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import loginBg from "../../assets/image/loginBg.png";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { CustomInput, CustomSelect } from "../../component/auth/CustomInput";
import { postNewUser } from "../../utils/axiosHelper";
import { toast } from "react-toastify";
const inputs = [
  {
    name: "department",
    label: "Select Department",
    id: "department",
    type: "select",
    required: true,

    option: [
      {
        name: "Receptionist",
      },
      {
        name: "Doctor",
      },
      {
        name: "Admin",
      },
    ],
  },
  {
    name: "name",
    label: "Name",
    id: "name",
    type: "text",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    id: "email",
    type: "email",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    id: "password",
    type: "password",
    required: true,
  },
  {
    name: "confirmPassword",
    label: "Confirm-Password",
    id: "confirmPassword",
    type: "password",
    required: true,
  },
];
const initialState = {
  department: "",
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const SignUp = () => {
  const [formData, setformData] = useState(initialState);
  const [error, setError] = useState({
    password: false,
    confirmPassword: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "password" || name === "confirmPassword") {
      setError({ password: false, confirmPassword: false });
    }
    setformData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { confirmPassword, ...rest } = formData;
    if (confirmPassword !== formData.password) {
      setError({ password: true, confirmPassword: true });
      return;
    }
  
    const signInPromise = postNewUser(rest);
    toast.promise(signInPromise, {
      pending: "In Progress...",
    });
    setIsLoading(true);
    const data = await signInPromise;
    setIsLoading(false);
    
    // console.log(data);
  
    if(data.status === "success"){
      toast.success("Your account has been created",{
        hideProgressBar:true,
        position: "top-center"
      });
      setformData(initialState)
    }
  };
  return (
    <Box padding={3}>
      <Box
        height="10vh"
        display="flex"
        justifyContent="end"
        alignContent="center"
      >
        <Box display="flex">
          <LocalHospitalIcon style={{ color: "var(--primary)" }} />{" "}
          <Typography>Hospital Management System</Typography>
        </Box>
      </Box>
      <Grid container height="80vh" alignItems="center" spacing={5}>
        <Grid item xs={12} sm={12} md={5} lg={6}>
          <img src={loginBg} alt="hospital image" width="100%" />
        </Grid>
        <Grid item xs={12} sm={12} md={7} lg={6}>
          <Typography align="center" component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
            {inputs.map((input, index) => {
              return (
                <div key={index}>
                  {input.type !== "select" ? (
                    <CustomInput
                      {...input}
                      value={formData[input.name]}
                      onChange={handleChange}
                      error={error[input.name]}
                      helperText={error[input.name] && "Passwords do not match"}
                    />
                  ) : (
                    <CustomSelect
                      input={input}
                      value={formData[input.name]}
                      onChange={handleChange}
                    />
                  )}
                </div>
              );
            })}

            {isLoading ? (
              <Button
                fullWidth
                disabled
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{ background: "var(--primary)" }}
              >
                Sign Up
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{ background: "var(--primary)" }}
              >
                Sign Up
              </Button>
            )}
            <Typography align="center">
              <Link href="/" variant="body2" align="center">
                {"Already have an account? Login In"}
              </Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignUp;
