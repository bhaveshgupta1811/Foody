import { Card } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const AddRestaurantCard = () => {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate("/admin/restaurant/add-restaurant")}
      className="dashboard-stat flex min-h-[30rem] cursor-pointer items-center justify-center px-5 transition hover:-translate-y-1"
      sx={{ width: 345, m: "0.25rem", borderRadius: "8px" }}
    >
      <div className="flex flex-col items-center">
        <div className="rounded-lg bg-pink-500/15 p-4 text-pink-300">
          <AddIcon sx={{ fontSize: "5rem" }} />
        </div>
        <h1 className="mt-5 text-center text-xl font-semibold text-gray-100">
          Add New Restaurants
        </h1>
        <p className="mt-2 text-center text-sm text-gray-400">
          Create your kitchen profile and start accepting orders.
        </p>
        
      </div>
    </Card>
  );
};

export default AddRestaurantCard;
