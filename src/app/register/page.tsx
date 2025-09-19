"use client";

import { registerUser } from "@/actions/register";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    jobTitle: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const res = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        jobTitle: formData.jobTitle,
      });
      if (!res.token) {
        throw new Error("Failed to register");
      }
      localStorage.setItem("token", res.token);
      router.push("/");
    } catch (error) {
      console.error("Registration failed:", error);
      alert(`Registration failed. Please try again. Error: ${error}`);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/");
    }
  }, [router]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
      }}
    >
      <Card sx={{ width: 500 }}>
        <CardContent>
          <Typography
            variant="h4"
            align="center"
            fontFamily={"cursive"}
            gutterBottom
          >
            Register
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <TextField
                label="Full Name"
                name="name"
                onChange={handleChange}
                value={formData.name}
                variant="outlined"
                margin="normal"
                fullWidth
              />
              <TextField
                label="Job Title"
                name="jobTitle"
                onChange={handleChange}
                value={formData.jobTitle}
                variant="outlined"
                margin="normal"
                fullWidth
              />
              <TextField
                label="Email"
                name="email"
                onChange={handleChange}
                value={formData.email}
                variant="outlined"
                margin="normal"
                fullWidth
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                onChange={handleChange}
                value={formData.password}
                variant="outlined"
                margin="normal"
                fullWidth
              />
              <TextField
                label="confirm Password"
                type="password"
                onChange={handleChange}
                value={formData.confirmPassword}
                name="confirmPassword"
                variant="outlined"
                margin="normal"
                fullWidth
              />
              <Button variant="contained" color="primary" type="submit">
                Register
              </Button>
            </FormGroup>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
