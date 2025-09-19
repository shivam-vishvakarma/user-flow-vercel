"use client";

import { loginUser } from "@/actions/login";
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

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!formData.email || !formData.password) {
        alert("Please fill in all fields");
        return;
      }
      const res = await loginUser(formData);
      if (!res.token) {
        throw new Error("Failed to login");
      }
      localStorage.setItem("token", res.token);
      router.push("/");
    } catch (error) {
      alert(`Login failed: ${error}`);
      console.error("Login failed:", error);
    }
    console.log("Logging in with:", formData);
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
        height: "80vh",
      }}
    >
      <Card sx={{ width: 300 }}>
        <CardContent>
          <Typography
            variant="h4"
            align="center"
            fontFamily={"cursive"}
            gutterBottom
          >
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormGroup>
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
                type="password"
                name="password"
                onChange={handleChange}
                value={formData.password}
                variant="outlined"
                margin="normal"
                fullWidth
              />
              <Button variant="contained" color="primary" type="submit">
                Login
              </Button>
            </FormGroup>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
