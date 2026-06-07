import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteRestaurant, updateRestaurantStatus } from "../../State/Customers/Restaurant/restaurant.action";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

export default function RestaurantCard({ item }) {
  const navigate = useNavigate();
  const dispatch=useDispatch()
const handleDeleteRestaurant=()=>{
  dispatch(deleteRestaurant(item.id))
}

const handleUpdateRestaurantStatus=()=>{
  dispatch(updateRestaurantStatus(item.id))
}

  return (
    <Card className="dashboard-stat admin-restaurant-card group" sx={{ width: 345, m: "0.25rem", borderRadius: "8px", overflow: "hidden" }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: "#e91e63", color: "white" }}
            aria-label="recipe"
          >
            Z
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={item.name}
        subheader={item.open ? "Open for orders" : "Currently closed"}
      />
      <div className="relative overflow-hidden">
        <img className="h-[17rem] w-full object-cover transition duration-500 group-hover:scale-105" src={item.imageUrl} alt={item.name} />
        <Chip
          className="!absolute !right-3 !top-3 !font-semibold"
          color={item.open ? "success" : "warning"}
          size="small"
          label={item.open ? "Live" : "Paused"}
        />
      </div>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Keep menu, orders, ingredients, events, and restaurant settings moving from a focused dashboard.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <div className="flex w-full items-center justify-between gap-2 px-1 pb-1">
          <div>
            <IconButton onClick={handleDeleteRestaurant} aria-label="delete restaurant">
              <DeleteIcon />
            </IconButton>
          </div>
          <div>
            <Button startIcon={<PowerSettingsNewIcon />} color={item.open?"warning":"success"} onClick={handleUpdateRestaurantStatus}>
              {item.open?"Close":"Open"}
            </Button>
          </div>
          <div>
            <Button startIcon={<DashboardIcon />} size="small" variant="contained" onClick={() => navigate("/admin/restaurant")}>
              Dashboard
            </Button>
          </div>
        </div>
      </CardActions>
    </Card>
  );
}
