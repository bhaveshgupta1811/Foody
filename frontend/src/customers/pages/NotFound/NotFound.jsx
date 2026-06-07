import React from "react";
import SearchOffIcon from "@mui/icons-material/SearchOff";

const NotFound = () => {
  return (
    <div className="not-found-page flex flex-col h-screen justify-center items-center">
      <div className="not-found-card">
        <SearchOffIcon sx={{ fontSize: "4rem" }} />
        <p>404</p>
        <h1>Page Not Found</h1>
        <span>The page you are looking for is not available.</span>
      </div>
    </div>
  );
};

export default NotFound;
