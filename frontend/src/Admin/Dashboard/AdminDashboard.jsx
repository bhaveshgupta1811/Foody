import React, { useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantByUserId } from "../../State/Customers/Restaurant/restaurant.action";
import AddRestaurantCard from "./AddRestaurantCard";
import StorefrontIcon from "@mui/icons-material/Storefront";


const AdminDashboard = () => {
  const {restaurant}=useSelector(state=>state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRestaurantByUserId());
  }, []);

  const restaurants = Array.isArray(restaurant.usersRestaurant)
    ? restaurant.usersRestaurant
    : restaurant.usersRestaurant
    ? [restaurant.usersRestaurant]
    : [];

  return (
    <div className="restaurant-dashboard admin-dashboard-page min-h-screen px-4 py-6 lg:px-20">
      <div className="dashboard-hero admin-dashboard-hero mb-6 rounded-lg border border-white/10 bg-[#101114] p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-pink-500/15 p-3 text-pink-300">
            <StorefrontIcon />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Restaurant Workspace</h1>
            <p className="text-sm text-gray-400">Manage your restaurant, open status, and dashboard from here.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {restaurants.map((item, index) => (
          <div className="stagger" style={{ "--delay": `${index * 70}ms` }} key={item.id}>
            <RestaurantCard item={item}/>
          </div>
        ))}
        {restaurants.length < 1 && <AddRestaurantCard/>}
      </div>
    </div>
  );
};

export default AdminDashboard;
