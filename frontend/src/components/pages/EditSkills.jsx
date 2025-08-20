import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import API from "../../api/axios";

const EditSkills = ({ user, setUser, closeModal }) => {
  const [formData, setFormData] = useState({
    skillsOffered: user?.skillsOffered.join(",") || "",
    skillsWanted: user?.skillsWanted.join(",") || "",
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
        "/api/users/editskills",
        {
          skillsOffered: formData.skillsOffered.split(",").map((s) => s.trim()),
          skillsWanted: formData.skillsWanted.split(",").map((s) => s.trim()),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUser(res.data.user); // update state
      closeModal(); // close modal
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
          label="Skills Offered"
          name="skillsOffered"
          value={formData.skillsOffered}
          onChange={handleChange}
          fullWidth
          sx={{
            input: { color: "white" }, // input text
            label: { color: "white" }, // label text
            "& .MuiInput-underline:before": { borderBottomColor: "white" }, // underline
            "& .MuiInput-underline:hover:before": {
              borderBottomColor: "white",
            },
            "& .MuiInput-underline:after": { borderBottomColor: "white" },
          }}
        />
        <TextField
          label="Skills Wanted"
          name="skillsWanted"
          type=""
          value={formData.skillsWanted}
          onChange={handleChange}
          fullWidth
          sx={{
            input: { color: "white" },
            label: { color: "white" },
            "& .MuiInput-underline:before": { borderBottomColor: "white" },
            "& .MuiInput-underline:hover:before": {
              borderBottomColor: "white",
            },
            "& .MuiInput-underline:after": { borderBottomColor: "white" },
          }}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{ color: "white" }} // button text color
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </Box>
    </form>
  );
};

export default EditSkills;
