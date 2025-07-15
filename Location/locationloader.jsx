import { Box } from "@mui/material";
import Lottie from "lottie-react";
import locationLoader from "./locationloader.json"; 

export default function LocationLoader () {
  return (
    
      <Box width={200} height={30} display="flex" alignItems="center" justifyContent="center" marginX="auto">
        <Lottie animationData={locationLoader} loop />
      </Box>
   
  );
};

