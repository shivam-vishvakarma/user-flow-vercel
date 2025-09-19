"use client";

import { getUser } from "@/actions/getUser";
import { saveBio } from "@/actions/saveBio";
import { User } from "@/types/types";
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
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [bio, setBio] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleEditClick = () => {
    setIsEditing(true);
    setBio(user?.bio || "");
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setBio(null);
  };

  const handleSaveClick = async () => {
    try {
      if (user) {
        const token = localStorage.getItem("token");
        if (!token) return;
        await saveBio({ token, bio: bio || "" });
        setUser({ ...user, bio: bio || "" });
        setBio(null);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error saving bio:", error);
    }
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      router.push("/login");
      return;
    }
    const fetchUser = async () => {
      try {
        const res = await getUser({ token });
        if (res) {
          setUser(res);
        } else {
          setUser(null);
          localStorage.removeItem("token");
          router.push("/login");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Grid
          container
          height={"80vh"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant="h6" align="center">
            Loading...
          </Typography>
        </Grid>
      </Container>
    );
  }

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
                    {user.name.charAt(0).toUpperCase()}
                  </Avatar>
                }
                title={user.name}
                subheader={user.jobTitle}
                action={
                  <IconButton aria-label="settings">
                    <MoreVert />
                  </IconButton>
                }
              />
              <CardContent>
                {isEditing ? (
                  <TextField
                    label="Bio"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                ) : (
                  <Typography variant="body1">{user.bio}</Typography>
                )}

                <Typography variant="body2" color="text.secondary">
                  Joined on {new Date(user.createdAt).toLocaleDateString()}
                </Typography>
              </CardContent>
              <CardActions>
                {isEditing ? (
                  <>
                    <Button
                      onClick={handleCancelClick}
                      size="small"
                      color="primary"
                      variant="contained"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSaveClick}
                      size="small"
                      color="secondary"
                      variant="outlined"
                    >
                      Save
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={handleEditClick}
                      size="small"
                      color="primary"
                      variant="contained"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={handleLogoutClick}
                      size="small"
                      color="secondary"
                      variant="outlined"
                    >
                      Logout
                    </Button>
                  </>
                )}
              </CardActions>
            </>
          )}
        </Card>
      </Grid>
    </Container>
  );
}
