import React, { useEffect } from 'react'
import OrderCard from '../../components/Order/OrderCard'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersOrders } from '../../../State/Customers/Orders/Action';
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

const Orders = () => {
  const {order,auth}=useSelector(store=>store);
  const dispatch=useDispatch();
  const jwt=localStorage.getItem("jwt")

  useEffect(()=>{
    dispatch(getUsersOrders(jwt))
  },[dispatch, jwt])
  const orderItems = order.orders.flatMap((item) =>
    item.items.map((foodItem) => ({
      orderStatus: item.orderStatus,
      item: foodItem,
    }))
  );

  return (
    <div className='account-page flex items-center flex-col'>
      <div className="account-page-header">
        <div className="account-page-header__icon">
          <ShoppingBagOutlinedIcon />
        </div>
        <div>
          <p className="account-page-eyebrow">Order History</p>
          <h1>My Orders</h1>
        </div>
      </div>
      {orderItems.length === 0 ? (
        <div className="account-empty-state">
          <ShoppingBagOutlinedIcon sx={{ fontSize: "3.5rem" }} />
          <h2>No orders yet</h2>
          <p>Your delivered and active orders will appear here.</p>
        </div>
      ) : (
        <div className='space-y-5 w-full lg:w-1/2'>
          {orderItems.map(({ orderStatus, item }, index) => (
            <div className="stagger" style={{ "--delay": `${index * 55}ms` }} key={`${item.id}-${index}`}>
              <OrderCard status={orderStatus} order={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders
