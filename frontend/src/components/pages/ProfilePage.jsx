import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
  Chip,
  Box,
  Button,
} from "@mui/material";
import ModalWrapper from "../layout/ModalWrapper";
import UpdateProfile from "../pages/UpdateProfile";
import { Person, Mail, CalendarToday, Star } from "@mui/icons-material";
import { motion } from "framer-motion";
import API from "../../api/axios";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, []);

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4  border-b-4 border-gray-700"></div>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-900 p-6 pt-12 gap-8">
      {/* User Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl"
      >
        <Card
          sx={{
            bgcolor: "#1f1f1f",
            color: "#fff",
            borderRadius: 3,
            boxShadow: 8,
            p: 2,
          }}
        >
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "blue", width: 64, height: 64 }}>
                <Person fontSize="large" />
              </Avatar>
            }
            title={
              <Typography variant="h4" fontWeight="bold">
                {user.username}
              </Typography>
            }
            subheader={
              <Box
                display="flex"
                alignItems="center"
                className="text-white"
                gap={1}
                mt={1}
              >
                <Mail fontSize="medium" />{" "}
                <Typography variant="h6">{user.email}</Typography>
              </Box>
            }
          />
          <CardContent>
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <Box display="flex" alignItems="center" gap={0.5}>
                <Star fontSize="medium" sx={{ color: "#FFD700" }} />
                <Typography variant="h6">{user.rating ?? 0}</Typography>
              </Box>
              <Chip
                label={user.role ?? "User"}
                color="primary"
                size="medium"
                sx={{ fontSize: "1rem", fontWeight: "bold" }}
              />
            </Box>

            <Box display="flex" gap={4} mb={2} className="text-gray-400">
              <Box display="flex" alignItems="center" gap={0.5}>
                <CalendarToday fontSize="small" />
                <Typography variant="body1">
                  Joined: {new Date(user.createdAt).toLocaleDateString()}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={0.5}>
                <CalendarToday fontSize="small" />
                <Typography variant="body1">
                  Updated: {new Date(user.updatedAt).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
         
            <ModalWrapper
              open={open}
              onClose={() => setOpen(false)}
              title="Edit Profile"
              actions={<Button onClick={() => setOpen(false)}>Cancel</Button>}
            >
              <UpdateProfile
                user={user}
                setUser={setUser}
                closeModal={() => setOpen(false)}
              />
            </ModalWrapper>

            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpen(true)}
            >
              Edit Profile
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Skills Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full max-w-4xl grid md:grid-cols-2 gap-6"
      >
        <Card
          sx={{
            bgcolor: "#1f1f1f",
            color: "#fff",
            borderRadius: 3,
            boxShadow: 8,
            p: 2,
          }}
        >
          <CardContent>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              Skills Offered
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1.5}>
              {user.skillsOffered?.length > 0 ? (
                user.skillsOffered.map((skill, idx) => (
                  <Chip
                    key={idx}
                    label={skill}
                    color="success"
                    size="medium"
                    sx={{ fontSize: "1rem", px: 1.5 }}
                  />
                ))
              ) : (
                <Typography variant="body1" color="gray">
                  No skills offered yet
                </Typography>
              )}
            </Box>
          </CardContent>
        </Card>

        <Card
          sx={{
            bgcolor: "#1f1f1f",
            color: "#fff",
            borderRadius: 3,
            boxShadow: 8,
            p: 2,
          }}
        >
          <CardContent>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              Skills Wanted
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1.5}>
              {user.skillsWanted?.length > 0 ? (
                user.skillsWanted.map((skill, idx) => (
                  <Chip
                    key={idx}
                    label={skill}
                    color="secondary"
                    size="medium"
                    sx={{ fontSize: "1rem", px: 1.5 }}
                  />
                ))
              ) : (
                <Typography variant="body1" color="gray">
                  No skills wanted yet
                </Typography>
              )}
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
