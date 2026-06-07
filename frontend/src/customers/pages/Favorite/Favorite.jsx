import React, { useEffect } from 'react'
import RestaurantCard from '../../components/RestarentCard/RestaurantCard'
import { useSelector } from 'react-redux'
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const Favorite = () => {
  const {auth}=useSelector(store=>store);

  useEffect(()=>{
    // dispatch()
  },[])
  return (
   <div className="account-page">
    <div className="account-page-header">
      <div className="account-page-header__icon">
        <FavoriteBorderIcon />
      </div>
      <div>
        <p className="account-page-eyebrow">Saved Places</p>
        <h1>My Favorites</h1>
      </div>
    </div>
    {auth.favorites?.length ? (
      <div className='flex flex-wrap justify-center gap-4'>
        {auth.favorites?.map((item, index)=>
          <div className="stagger" style={{ "--delay": `${index * 55}ms` }} key={item.id}>
            <RestaurantCard data={item}/>
          </div>
        )}
      </div>
    ) : (
      <div className="account-empty-state">
        <FavoriteBorderIcon sx={{ fontSize: "3.5rem" }} />
        <h2>No favorites yet</h2>
        <p>Restaurants you save will show up here.</p>
      </div>
    )}
   </div>
  )
}

export default Favorite
