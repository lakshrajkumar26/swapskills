import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import API from "../../api/axios";

const UpdateProfile = ({ user, setUser, closeModal }) => {
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const res = await API.put(
        "/api/users/updateprofile",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update local state with new profile
      setUser(res.data.user);

      closeModal(); // Close modal on success
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </Box>
    </form>
  );
};

export default UpdateProfile;
