import React, { useEffect } from "react";
import OrdersTable from "./OrderTable";
import {
  Card,
  Chip,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurantsOrder } from "../../State/Admin/Order/restaurants.order.action";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

const orderStatus = [
  { label: "Pending", value: "PENDING" },
  { label: "Completed", value: "COMPLETED" },
  // { label: "Out For Delivery", value: "OUT_FOR_DELIVERY" },
  // { label: "Delivered", value: "DELIVERED" },
  { label: "All", value: "all" },
];

const RestaurantsOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, auth } = useSelector((store) => store);

  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);
  const filterValue = searchParams.get("order_status");

  useEffect(() => {
    dispatch(
      fetchRestaurantsOrder({
        restaurantId: restaurant.usersRestaurant?.id,
        orderStatus: filterValue,
        jwt: auth.jwt || jwt,
      })
    );
  }, [auth.jwt, filterValue]);

  const handleFilter = (e, value) => {
    const searchParams = new URLSearchParams(location.search);

    if (value === "all") {
      searchParams.delete("order_status");
    } else searchParams.set("order_status", e.target.value);

    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };
  
  return (
    <div className="admin-orders-page px-2">
      <Card className="admin-order-filter-card p-5">
        <div className="admin-section-heading">
          <div className="admin-section-heading__icon">
            <ReceiptLongIcon />
          </div>
          <div>
            <p>Restaurant Orders</p>
            <Typography variant="h5">Order Status</Typography>
          </div>
          <Chip className="status-info" label={filterValue || "all"} size="small" />
        </div>
        <FormControl className="py-10" component="fieldset">
          <RadioGroup
            row
            name="category"
            value={filterValue ? filterValue : "all"}
            onChange={handleFilter}
          >
            {orderStatus.map((item, index) => (
              <FormControlLabel
                key={index}
                value={item.value}
                control={<Radio />}
                label={item.label}
                sx={{ color: "gray" }}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Card>

      <OrdersTable name={"All Orders"} />
    </div>
  );
};

export default RestaurantsOrder;
