import {
  Box,
  Button,
  Card,
  CardContent,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";

export default function LoginPage() {
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
          <FormGroup>
            <TextField
              label="Username"
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
            <Button variant="contained" color="primary" type="submit">
              Login
            </Button>
          </FormGroup>
        </CardContent>
      </Card>
    </Box>
  );
}
