import React, { useEffect } from 'react'
import { getAllEvents } from '../../../State/Customers/Restaurant/restaurant.action';
import { useDispatch, useSelector } from 'react-redux';
import EventCard from '../../../Admin/Events/EventCard';
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

const CustomerEvents = () => {
  const dispatch=useDispatch()
  const jwt=localStorage.getItem("jwt")
 
  const {restaurant,auth}=useSelector(store=>store);

  useEffect(()=>{
    dispatch(getAllEvents({jwt}))
  },[dispatch, jwt])
  return (
    <div className="account-page mt-5 px-5">
      <div className="account-page-header">
        <div className="account-page-header__icon">
          <EventAvailableIcon />
        </div>
        <div>
          <p className="account-page-eyebrow">Restaurant Offers</p>
          <h1>Events</h1>
        </div>
      </div>
      {restaurant.events.length ? (
        <div className="flex flex-wrap gap-5">
          {restaurant.events.map((item, index)=> (
            <div className="stagger" style={{ "--delay": `${index * 55}ms` }} key={item.id || index}>
              <EventCard isCustomer={true} item={item}/>
            </div>
          ))}
        </div>
      ) : (
        <div className="account-empty-state">
          <EventAvailableIcon sx={{ fontSize: "3.5rem" }} />
          <h2>No events right now</h2>
          <p>Restaurant events and offers will appear here.</p>
        </div>
      )}
  </div>
  )
}

export default CustomerEvents
