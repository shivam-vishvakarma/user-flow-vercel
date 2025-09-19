import NextLink from "next/link";
import { Avatar, Box, Container, Link, Typography } from "@mui/material";

export const Navbar = () => {
  return (
    <Box p={1} bgcolor={"primary.main"} color={"white"}>
      <Container maxWidth="lg">
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          p={1}
        >
          <Box display={"flex"} alignItems={"center"} gap={1}>
            <Avatar sx={{ bgcolor: "primary.light" }}>L</Avatar>
            <Typography variant="h6">Logo</Typography>
          </Box>
          <Box display={"flex"} alignItems={"center"} gap={2}>
            <Link
              href="/"
              color="primary.contrastText"
              component={NextLink}
              underline="hover"
              sx={{ textUnderlineOffset: 4 }}
            >
              Home
            </Link>
            <Link
              href="/login"
              component={NextLink}
              color="primary.contrastText"
              underline="hover"
              sx={{ textUnderlineOffset: 4 }}
            >
              Login
            </Link>
            <Link
              href="/register"
              component={NextLink}
              color="primary.contrastText"
              underline="hover"
              sx={{ textUnderlineOffset: 4 }}
            >
              Register
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
