import {
  Box,
  Button,
  Card,
  CardContent,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";

export default function RegisterPage() {
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
          <FormGroup>
            <TextField
              label="Full Name"
              variant="outlined"
              margin="normal"
              fullWidth
            />
            <TextField
              label="Job Title"
              variant="outlined"
              margin="normal"
              fullWidth
            />
            <TextField
              label="Email"
              variant="outlined"
              margin="normal"
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              fullWidth
            />
            <TextField
              label="confirm Password"
              type="password"
              variant="outlined"
              margin="normal"
              fullWidth
            />
            <Button variant="contained" color="primary" type="submit">
              Register
            </Button>
          </FormGroup>
        </CardContent>
      </Card>
    </Box>
  );
}
