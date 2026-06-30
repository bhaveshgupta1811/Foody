import { Card, Chip } from "@mui/material";
import React from "react";

const OrderCard = ({ order, status }) => {
  const statusClass =
    status === "DELIVERED" || status === "COMPLETED"
      ? "status-success"
      : status === "PENDING"
      ? "status-info"
      : "status-warning";

  return (
    <Card className="account-order-card">
      <div className="flex min-w-0 items-center space-x-5">
        <img
          className="account-order-card__img"
          src={order.food.images[0]}
          alt={order.food.name}
        />
        <div className="min-w-0">
          <p className="account-order-card__name">{order.food.name}</p>
          <p className="account-order-card__price">₹{order.food.price}</p>
        </div>
      </div>
      <div className="account-order-card__status">
        <Chip className={statusClass} label={status} size="small" />
      </div>
    </Card>
  );
};

export default OrderCard;
