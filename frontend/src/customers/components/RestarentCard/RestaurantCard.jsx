import React, { useState } from "react";
import "./Restaurant.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites } from "../../../State/Authentication/Action";
import { isPresentInFavorites } from "../../../config/logic";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarIcon from "@mui/icons-material/Star";

const RestaurantCard = ({ data, index = 0 }) => {
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();
  const [favBeat, setFavBeat] = useState(false);

  const isFav = isPresentInFavorites(auth.favorites, data);

  const handleAddToFavorites = (e) => {
    e.stopPropagation();
    setFavBeat(true);
    dispatch(addToFavorites({ restaurantId: data.id, jwt: auth.jwt || jwt }));
    setTimeout(() => setFavBeat(false), 700);
  };

  const navigateToRestaurant = () => {
    if (data.open)
      navigate(`/restaurant/${data.address.city}/${data.name}/${data.id}`);
  };

  const delay = `${index * 80}ms`;
  const descShort =
    data.description?.length > 38
      ? data.description.substring(0, 38) + "…"
      : data.description;

  return (
    <div
      className="rest-card"
      style={{ "--delay": delay, width: "17rem" }}
      onClick={navigateToRestaurant}
    >
      {/* ── Image ── */}
      <div className="rest-card__img-wrap">
        <img
          className="rest-card__img"
          src={data.images?.[0]}
          alt={data.name}
        />
        <div className="rest-card__gradient" />

        {/* Open / Closed badge */}
        <span
          className={`rest-card__badge ${
            data.open ? "rest-card__badge--open" : "rest-card__badge--closed"
          }`}
        >
          {data.open ? "Open" : "Closed"}
        </span>

        {/* Favourite button */}
        <button
          className="rest-card__fav"
          onClick={handleAddToFavorites}
          aria-label="Toggle favourite"
        >
          {isFav ? (
            <FavoriteIcon
              sx={{ fontSize: "1.1rem", color: "#e91e63" }}
              className={favBeat ? "anim-heart" : ""}
            />
          ) : (
            <FavoriteBorderIcon
              sx={{ fontSize: "1.1rem", color: "#fff" }}
              className={favBeat ? "anim-heart" : ""}
            />
          )}
        </button>
      </div>

      {/* ── Body ── */}
      <div className="rest-card__body">
        <p className="rest-card__name">{data.name}</p>
        <p className="rest-card__desc">{descShort}</p>

        <div className="rest-card__meta">
          {/* Rating placeholder */}
          <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
            <StarIcon sx={{ fontSize: "0.85rem", color: "#f59e0b" }} />
            <span style={{ color: "#f59e0b", fontWeight: 700 }}>4.2</span>
          </span>

          <span className="rest-card__dot" />

          <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
            <AccessTimeIcon sx={{ fontSize: "0.85rem" }} />
            {data.openingHours
              ? data.openingHours.split("to")[0]?.trim()
              : "30 min"}
          </span>

          <span className="rest-card__dot" />

          <span>{data.address?.city || "City"}</span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
