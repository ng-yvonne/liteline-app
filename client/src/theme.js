import { lightBlue } from "@mui/material/colors";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    primary: {
      main: lightBlue[600],
    },
    primaryLight: {
      main: lightBlue[50],
    },
  },
  typography: {
    fontFamily: [
      "Lexend",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Roboto",
      "Helvetica Neue",
      "Arial",
      "sans-serif",
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol",
    ].join(","),
  },
});

theme = responsiveFontSizes(theme);

export default theme;
