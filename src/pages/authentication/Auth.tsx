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

interface authHandlerProps {
  authHandler: () => void;
}

export const Auth = ({ authHandler }: authHandlerProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
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
        backgroundImage: `url('assets//backgroundLeaves.svg')`,
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
        }}
      >
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Вход
        </Typography>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            id="outlined-multiline-flexible"
            label="Login"
            multiline
            maxRows={4}
          />
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </Box>
        <Button
          onClick={authHandler}
          variant="contained"
          sx={{ bgcolor: "green" }}
        >
          Войти
        </Button>
      </Paper>
    </Box>
  );
}