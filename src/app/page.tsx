import { MoreVert } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";

export default function Home() {
  const user = {
    name: "Shivam Vishwakarma",
    role: "Web Developer",
    avatar: "S",
    bio: "Hi there! I'm Shivam, a passionate web developer. I recently started exploring Next.js and I'm loving it!. Next I am planning to explore Vercel.",
  };
  return (
    <Container maxWidth="lg">
      <Grid
        container
        height={"80vh"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Card sx={{ maxWidth: 400 }}>
          {!user ? (
            <CardContent>
              <Typography variant="h6" align="center">
                Welcome to our website! Please log in or register to continue.
              </Typography>
            </CardContent>
          ) : (
            <>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: "primary.main" }}>
                    {user.avatar}
                  </Avatar>
                }
                title={user.name}
                subheader={user.role}
                action={
                  <IconButton aria-label="settings">
                    <MoreVert />
                  </IconButton>
                }
              />
              <CardContent>
                <Typography variant="body1">{user.bio}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" variant="contained">
                  Edit
                </Button>
                <Button size="small" color="secondary" variant="outlined">
                  Logout
                </Button>
              </CardActions>
            </>
          )}
        </Card>
      </Grid>
    </Container>
  );
}
