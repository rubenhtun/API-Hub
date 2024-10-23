import { useState, FormEvent } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Avatar,
  Paper,
  Link,
  Alert,
} from "@mui/material";

interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  followers: number;
  public_repos: number;
  html_url: string;
}

export default function GitHubUserSearch() {
  const [userName, setUserName] = useState<string>("");
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [error, setError] = useState<string>("");

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const responseData = await fetch(
        `https:/api.github.com/users/${userName}`
      );
      if (!responseData.ok) {
        throw new Error("User not found");
      }
      const data = await responseData.json();
      setUserData(data);
      setError("");
    } catch (err) {
      setError("User not found or an error occurred");
      setUserData(null);
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
        backgroundColor: "#f5f5f5",
        padding: 3,
      }}
    >
      <Typography variant="h4" sx={{ mb: 2, color: "#333" }}>
        GitHub User Search
      </Typography>

      <Box
        component="form"
        onSubmit={handleSearch}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <TextField
          label="GitHub Username"
          variant="outlined"
          fullWidth
          //   value={userName}
          onChange={(e) => setUserName(e.target.value)}
          sx={{ backgroundColor: "#fff" }}
        />
        <Button variant="contained" type="submit" fullWidth>
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
            alt="Avatar"
            src={userData.avatar_url}
            sx={{ width: 100, height: 100, margin: "0 auto" }}
          />
          <Typography variant="h6" sx={{ mt: 2 }}>
            {userData.name || userData.login}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {userData.bio}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Followers: {userData.followers}
          </Typography>
          <Typography variant="body2">
            Public Repositories: {userData.public_repos}
          </Typography>
          <Link
            href={userData.html_url}
            target="_blank"
            rel="noopener"
            sx={{ mt: 2, display: "block", color: "primary.main" }}
          >
            GitHub Profile
          </Link>
        </Paper>
      )}
    </Box>
  );
}
