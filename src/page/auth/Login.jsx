import React, { useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { CustomInput, CustomSelect } from "../../component/auth/CustomInput";
import { fetchUserInfo, userLogin } from "../../utils/axiosHelper";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "../../redux/features/userSlice";

import loginBg from "../../assets/image/loginBg.png";

const inputs = [
    {
        name: "email",
        label: "Email",
        id: "email",
        type: "email",
    },
    {
        name: "password",
        label: "Password",
        id: "password",
        type: "password",
    },
];

const initialState = {
    email: "",
    password: "",
};

const Login = () => {
    const [formData, setFormData] = useState(initialState);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setErrorMessage("");
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const loginPromise = userLogin(formData);
            toast.promise(loginPromise, {
                pending: "In Progress...",
            });

            const result = await loginPromise;

            if (result.status === "success") {
                sessionStorage.setItem("accessJWT", result.tokens.accessJWT);
                localStorage.setItem("refreshJWT", result.tokens.refreshJWT);

                const user = await fetchUserInfo();
                dispatch(getUser(user));

                navigate("/");
            } else {
                setErrorMessage("Invalid login credentials!");
            }
        } catch (error) {
            setErrorMessage("An error occurred. Please try again.");
            console.error("Login Error:", error);
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
                        Log in
                    </Typography>

                    <Box
                        component="form"
                        sx={{ mt: 1 }}
                        onSubmit={handleSubmit}
                    >
                        {errorMessage && (
                            <Typography p={1} color={"red"}>
                                {errorMessage}
                            </Typography>
                        )}
                        {inputs.map((input, index) => (
                            <div key={index}>
                                {input.type !== "select" ? (
                                    <CustomInput
                                        {...input}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <CustomSelect
                                        input={input}
                                        value={formData[input.name]}
                                        onChange={handleChange}
                                    />
                                )}
                            </div>
                        ))}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            style={{ background: "var(--primary)" }}
                        >
                            Log In
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Login;
