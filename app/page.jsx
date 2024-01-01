import { Container, Typography, Box } from "@mui/material";

import MyTextbox from "./components/MyTextbox";
import MyButton from "./components/MyButton";

export default function Home() {

  return (
    <Box
      sx={{
        mt: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <MyTextbox
        variant="outlined"
        margin="normal"
        required
        label="Email Address / Username"
        type="text"      
        />
      <MyTextbox
        variant="outlined"
        margin="normal"
        required        
        type="password"
        label="Password"
        />    
      <MyButton label="Sign In"/>        
    </Box> 
  );
}
