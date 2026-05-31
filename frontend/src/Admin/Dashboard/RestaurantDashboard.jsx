import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getMenuItemsByRestaurantId } from "../../State/Customers/Menu/menu.action";
import { Grid } from "@mui/material";
import OrdersTable from "../Orders/OrderTable";
import MenuItemTable from "../Food/MenuItemTable";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import SellIcon from "@mui/icons-material/Sell";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import { Button, Chip } from "@mui/material";

const RestaurantDashboard = () => {
  const { id } = useParams();
  const {restaurant}=useSelector(store=>store);
  const { menu, restaurantsOrder } = useSelector((store) => store);
  console.log("restaurants id ", id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const restaurantId = id || restaurant.usersRestaurant?.id;

  useEffect(() => {
    if (!restaurantId) return;
    dispatch(
      getMenuItemsByRestaurantId({
        restaurantId,
        jwt: localStorage.getItem("jwt"),
      })
    );
  }, [dispatch, restaurantId]);

  console.log("restaurant",restaurant)
  const orders = restaurantsOrder.orders || [];
  const menuItems = menu.menuItems || [];
  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order?.totalAmount || 0),
    0
  );
  const pendingOrders = orders.filter((order) => order?.orderStatus === "PENDING").length;
  const availableItems = menuItems.filter((item) => item?.available).length;
  const restaurantName = restaurant.usersRestaurant?.name || "Your Restaurant";

  const stats = [
    {
      title: "Total Revenue",
      value: `Rs. ${totalRevenue.toLocaleString("en-IN")}`,
      helper: "From recent orders",
      icon: <CurrencyRupeeIcon />,
      tone: "from-emerald-500/25 to-cyan-500/10",
      accent: "text-emerald-300",
    },
    {
      title: "Orders",
      value: orders.length,
      helper: `${pendingOrders} pending now`,
      icon: <ReceiptLongIcon />,
      tone: "from-pink-500/25 to-rose-500/10",
      accent: "text-pink-300",
    },
    {
      title: "Menu Items",
      value: menuItems.length,
      helper: `${availableItems} available`,
      icon: <FastfoodIcon />,
      tone: "from-amber-400/25 to-orange-500/10",
      accent: "text-amber-300",
    },
    {
      title: "Sell Rate",
      value: `${menuItems.length ? Math.round((availableItems / menuItems.length) * 100) : 0}%`,
      helper: "Menu readiness",
      icon: <SellIcon />,
      tone: "from-violet-500/25 to-indigo-500/10",
      accent: "text-violet-300",
    },
  ];

  return (
    <div className="restaurant-dashboard min-h-screen px-3 py-4 sm:px-5 lg:px-6">
      <section className="dashboard-hero relative overflow-hidden rounded-lg border border-white/10 bg-[#101114] p-5 shadow-2xl shadow-black/30 sm:p-7">
        <div className="dashboard-orbit dashboard-orbit-one" />
        <div className="dashboard-orbit dashboard-orbit-two" />
        <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <Chip
              icon={<AccessTimeIcon />}
              label="Live kitchen overview"
              size="small"
              className="!mb-4 !border-white/10 !bg-white/10 !text-white"
              variant="outlined"
            />
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              {restaurantName} Dashboard
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-gray-300">
              Track orders, menu availability, and sales momentum from one fast workspace.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              startIcon={<AddCircleOutlineIcon />}
              variant="contained"
              onClick={() => navigate("/admin/restaurant/add-menu")}
              sx={{ borderRadius: "8px", px: 2.5, py: 1.1 }}
            >
              Add Menu
            </Button>
            <Button
              endIcon={<ArrowForwardIcon />}
              variant="outlined"
              onClick={() => navigate("/admin/restaurant/orders")}
              sx={{ borderRadius: "8px", px: 2.5, py: 1.1, color: "white", borderColor: "rgba(255,255,255,.25)" }}
            >
              Orders
            </Button>
          </div>
        </div>
      </section>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={stat.title}
            className={`dashboard-stat rounded-lg border border-white/10 bg-gradient-to-br ${stat.tone} p-4 shadow-xl shadow-black/20`}
            style={{ animationDelay: `${index * 90}ms` }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-gray-300">{stat.title}</p>
                <p className="mt-2 text-2xl font-bold text-white">{stat.value}</p>
              </div>
              <div className={`rounded-lg bg-white/10 p-3 ${stat.accent}`}>
                {stat.icon}
              </div>
            </div>
            <div className="mt-5 flex items-center gap-2 text-xs text-gray-300">
              <TrendingUpIcon sx={{ fontSize: "1rem" }} className={stat.accent} />
              <span>{stat.helper}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.4fr_.8fr]">
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
          <div className="mb-4 flex items-center gap-3">
            <RestaurantMenuIcon className="text-pink-300" />
            <div>
              <h2 className="text-lg font-semibold text-white">Service Pulse</h2>
              <p className="text-xs text-gray-400">A quick read before the rush begins.</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {["Prep queue", "Packing", "Ready"].map((label, index) => (
              <div key={label} className="pulse-step rounded-lg border border-white/10 bg-black/20 p-4" style={{ animationDelay: `${index * 120}ms` }}>
                <p className="text-xs uppercase tracking-wider text-gray-400">{label}</p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="service-meter h-full rounded-full" style={{ width: `${55 + index * 14}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-3">
            <Inventory2OutlinedIcon className="text-amber-300" />
            <div>
              <h2 className="text-lg font-semibold text-white">Kitchen Focus</h2>
              <p className="text-xs text-gray-400">{availableItems} items ready to sell.</p>
            </div>
          </div>
          <div className="mt-5 space-y-3">
            {menuItems.slice(0, 3).map((item, index) => (
              <div key={item.id || item.name} className="menu-spark flex items-center justify-between rounded-lg bg-black/20 px-3 py-2" style={{ animationDelay: `${index * 100}ms` }}>
                <span className="truncate pr-3 text-sm text-gray-200">{item.name}</span>
                <Chip size="small" label={item.available ? "In stock" : "Restock"} color={item.available ? "success" : "warning"} />
              </div>
            ))}
            {menuItems.length === 0 && (
              <p className="rounded-lg bg-black/20 px-3 py-4 text-sm text-gray-400">
                Add menu items to see kitchen focus here.
              </p>
            )}
          </div>
        </div>
      </div>

      <Grid container spacing={2} className="dashboard-table-grid !mt-3">
        <Grid lg={6} xs={12} item>
          <OrdersTable name={"Recent Order"} isDashboard={true} />
        </Grid>
        <Grid lg={6} xs={12} item>
          <MenuItemTable isDashboard={true} name={"Recently Added Menu"} />
        </Grid>
      </Grid>
    </div>
  );
};

export default RestaurantDashboard;
