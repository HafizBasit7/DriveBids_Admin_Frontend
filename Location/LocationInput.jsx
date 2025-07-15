import { useRef, useEffect } from "react";
import { StandaloneSearchBox, useLoadScript } from "@react-google-maps/api";
import { TextField } from "@mui/material";
import colors from "../Location/color"
import LocationLoader from "./locationloader";

export default function LocationInput({
  loading,
  value,
  handleChange,
  placeholder,
  children,
}) {
  const inputRef = useRef();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyB7uPqMeibItFdpdNa1M4pF0jd6L1xOU7g",
    libraries: ["places"],
  });

  useEffect(() => {
    // Add custom styles for the Google Places Autocomplete dropdown
    const style = document.createElement("style");
    style.textContent = `
            .pac-container {
                border-radius: 8px !important;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
                border: none !important;
                margin-top: 8px !important;
                font-family: 'Inter', sans-serif !important;
                width: 100% !important;
                min-width: 200px !important;
                max-width: 400px !important;
            }
            .pac-container:after {
                display: none !important;
            }
            .pac-item {
                padding: 12px 16px !important;
                border-bottom: 1px solid #f0f0f0 !important;
                transition: background-color 0.2s ease !important;
            }
            .pac-item:hover {
                background-color: #f8f9fa !important;
            }
            .pac-item-query {
                font-size: 14px !important;
                color: #333 !important;
                font-weight: 500 !important;
            }
            .pac-matched {
                font-weight: 600 !important;
                color: ${colors.buttoncolor} !important;
            }
            .pac-icon {
                margin-right: 12px !important;
            }
            .pac-item:last-child {
                border-bottom: none !important;
            }
        `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handlePlaceChanged = () => {
    const [place] = inputRef.current.getPlaces();
    if (place) {
      const location = {
        name: place.formatted_address,
        coordinates: [
          place.geometry.location.lng(),
          place.geometry.location.lat(),
        ],
      };
      handleChange(location);
    }
  };

  // Show loader while script is loading
  if (!isLoaded) {
    return <LocationLoader />;
  }

  // Show error if script failed to load
  if (loadError) {
    return (
      <TextField
        disabled={true}
        fullWidth
        label="Location"
        placeholder="Error loading location service"
        sx={{
          "& .MuiOutlinedInput-root": {
            height: 50,
            borderRadius: 2,
            "& fieldset": { borderColor: "#ccc" },
          },
          "& .MuiInputLabel-root": { color: "#888" },
        }}
      />
    );
  }

  return (
    <StandaloneSearchBox
      onLoad={(ref) => (inputRef.current = ref)}
      onPlacesChanged={handlePlaceChanged}
    >
      {children ? (
        children
      ) : (
        <TextField
          disabled={loading}
          fullWidth
          label="Location"
          placeholder={value || placeholder || "Location"}
          sx={{
            "& .MuiOutlinedInput-root": {
              height: 50,
              borderRadius: 2,
              "& fieldset": { borderColor: "#ccc" },
              "&:hover fieldset": { borderColor: "#2F61BF" },
              "&.Mui-focused fieldset": { borderColor: "#2F61BF" },
            },
            "& .MuiInputLabel-root": { color: "#888" },
            "& .MuiInputLabel-root.Mui-focused": {
              color: colors.buttoncolor,
            },
          }}
        />
      )}
    </StandaloneSearchBox>
  );
}
