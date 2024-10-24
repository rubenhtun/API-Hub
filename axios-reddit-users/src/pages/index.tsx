import { useState, FormEvent } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Box,
  Avatar,
  Paper,
  Alert,
} from "@mui/material";

interface RedditUser {
  name: string;
  icon_img: string;
  total_karma: number;
  subscriber_count: number;
}

export default function RedditUserSearch() {
  const [username, setUsername] = useState<string>("");
  const [userData, setUserData] = useState<RedditUser | null>(null);
  const [error, setError] = useState<string>("");

  const fetchRedditUser = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setUserData(null);
    try {
      const response = await axios.get(
        `https://www.reddit.com/user/${username}/about.json`
      );
      const responseData = response.data;
      setUserData(responseData.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError("User not found");
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f4f8",
        padding: 3,
      }}
    >
      <Typography
        variant="h4"
        sx={{ mb: 3, color: "#333", fontWeight: "bold" }}
      >
        Axios Reddit Users
      </Typography>

      <Box
        component="form"
        onSubmit={fetchRedditUser}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          width: "100%",
          maxWidth: "400px",
          borderRadius: 1,
          boxShadow: 3,
          backgroundColor: "#ffffff",
          padding: 2,
        }}
      >
        <TextField
          label="Reddit Username"
          variant="outlined"
          value={username}
          fullWidth
          onChange={(e) => setUsername(e.target.value)}
          sx={{ backgroundColor: "#fafafa" }}
        />
        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{
            backgroundColor: "#ff5722",
            "&:hover": { backgroundColor: "#e64a19" },
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Search
        </Button>
      </Box>

      {error && (
        <Alert
          severity="error"
          sx={{ mt: 2, width: "100%", maxWidth: "400px" }}
        >
          {error}
        </Alert>
      )}

      {userData && (
        <Paper
          elevation={3}
          sx={{
            mt: 4,
            p: 3,
            maxWidth: "400px",
            width: "100%",
            textAlign: "center",
          }}
        >
          <Avatar
            alt={userData.name}
            src={userData.icon_img}
            sx={{
              width: 100,
              height: 100,
              margin: "0 auto",
              border: "2px solid #0079d3",
            }}
          />
          <Typography
            variant="h6"
            sx={{ mt: 2, color: "#004d40", fontWeight: "bold" }}
          >
            {userData.name}
          </Typography>
          <Typography variant="body1" sx={{ color: "#555" }}>
            Total Karma: {userData.total_karma}
          </Typography>
          <Typography variant="body2" sx={{ color: "#555" }}>
            Subscribers: {userData.subscriber_count}
          </Typography>
        </Paper>
      )}
    </Box>
  );
}
