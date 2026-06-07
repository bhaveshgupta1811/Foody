import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersNotificationAction } from "../../../State/Customers/Orders/Action";
import { Card } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

const Notifications = () => {
  const dispatch = useDispatch();

  const { order } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getUsersNotificationAction());
  }, [dispatch]);

  return (
    <div className="account-page space-y-5 px-5 lg:px-20">
      <div className="account-page-header">
        <div className="account-page-header__icon">
          <NotificationsNoneIcon />
        </div>
        <div>
          <p className="account-page-eyebrow">Updates</p>
          <h1>Notifications</h1>
        </div>
      </div>
      {order.notifications.length ? (
        order.notifications.map((item, index) => (
          <Card className="account-notification-card stagger" style={{ "--delay": `${index * 55}ms` }} key={item.id || index}>
            <p>{item.message}</p>
          </Card>
        ))
      ) : (
        <div className="account-empty-state">
          <NotificationsNoneIcon sx={{ fontSize: "3.5rem" }} />
          <h2>No notifications</h2>
          <p>Order updates and restaurant alerts will appear here.</p>
        </div>
      )}
    </div>
  );
};

export default Notifications;
