import React from "react";
import AddressCard from "../../components/Address/AddressCard";
import { useSelector } from "react-redux";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

const UsersAddresses = () => {
  const {auth}=useSelector(state=>state)
  return (
    <div className="account-page">
      <div className="flex items-center flex-col lg:px-10">
        <div className="account-page-header">
          <div className="account-page-header__icon">
            <HomeOutlinedIcon />
          </div>
          <div>
            <p className="account-page-eyebrow">Saved Locations</p>
            <h1>Addresses</h1>
          </div>
        </div>
        {auth.user?.addresses?.length ? (
          <div className="flex justify-center flex-wrap gap-3">
            {auth.user?.addresses.map((item, index) => (
              <div className="stagger" style={{ "--delay": `${index * 55}ms` }} key={item.id || index}>
                <AddressCard item={item}/>
              </div>
            ))}
          </div>
        ) : (
          <div className="account-empty-state">
            <HomeOutlinedIcon sx={{ fontSize: "3.5rem" }} />
            <h2>No saved address</h2>
            <p>Add an address during checkout to reuse it later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersAddresses;
