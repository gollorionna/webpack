import { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CircularProgress from "@mui/material/CircularProgress";
import { useLoginMutation } from "@/store/api";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/redux.hook";
import { setCredentials } from "@/store/auth";

export const AuthPage = () => {
  const [login, { isLoading, error }] = useLoginMutation();
  const [userLogin, setUserLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await login({
        username: userLogin,
        password,
      }).unwrap();

      localStorage.setItem("token", result.accessToken);

      dispatch(
        setCredentials({
          user: {
            id: result.id,
            username: result.username,
            email: result.email,
            firstName: result.firstName,
            lastName: result.lastName,
          },
          token: result.accessToken,
        })
      );

      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        m: 0,
        p: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url("assets/backgroundLeaves.svg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          marginY: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          minWidth: 320,
        }}
      >
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Login
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Login"
            value={userLogin}
            onChange={(e) => setUserLogin(e.target.value)}
            required
            fullWidth
            disabled={isLoading}
          />

          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="password-input">Password</InputLabel>
            <OutlinedInput
              id="password-input"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword ? "hide password" : "show password"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          {error && (
            <Typography color="error" variant="body2" align="center">
              Invalid login or password
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            sx={{ bgcolor: "green", "&:hover": { bgcolor: "darkgreen" } }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Sign in"
            )}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
