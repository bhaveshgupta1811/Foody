import { Chip, IconButton } from "@mui/material";
import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import {
  removeCartItem,
  updateCartItem,
} from "../../../State/Customers/Cart/cart.action";

const CartItemCard = ({ item }) => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);

  const handleRemoveCartItem = () => {
    dispatch(removeCartItem({ cartItemId: item.id, jwt: auth.jwt || jwt }));
  };

  const handleUpdateCartItem = (value) => {
    if (value === -1 && item.quantity === 1) {
      handleRemoveCartItem();
      return;
    }
    const data = { cartItemId: item.id, quantity: item.quantity + value };
    dispatch(updateCartItem({ data, jwt: auth.jwt || jwt }));
  };

  return (
    <div className="cart-item-card">
      <div className="cart-item-card__main">
        <img
          className="cart-item-card__img"
          src={item.food.images[0]}
          alt={item.food.name}
        />
        <div className="cart-item-card__body">
          <div>
            <p className="cart-item-card__name">{item.food.name}</p>
            <p className="cart-item-card__price">₹{item.totalPrice}</p>
          </div>
          <div className="cart-item-card__stepper">
            <IconButton onClick={() => handleUpdateCartItem(-1)} color="primary">
              <RemoveCircleOutlineIcon />
            </IconButton>
            <span>{item.quantity}</span>
            <IconButton onClick={() => handleUpdateCartItem(1)} color="primary">
              <AddCircleOutlineIcon />
            </IconButton>
          </div>
        </div>
      </div>
      {item.ingredients.length > 0 && (
        <div className="cart-item-card__ingredients">
          {item.ingredients.map((ingredient) => (
            <Chip key={ingredient} label={ingredient} size="small" />
          ))}
        </div>
      )}
    </div>
  );
};

export default CartItemCard;
