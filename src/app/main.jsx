import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// import "../shared/styles/globals.css";
// import "../shared/styles/variables.css";
// import "../shared/styles/theme.css";

import Providers from "./providers";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Providers />
  </React.StrictMode>
);