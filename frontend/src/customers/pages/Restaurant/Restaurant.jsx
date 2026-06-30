import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";
import MenuItemCard from "../../components/MenuItem/MenuItemCard";
import RestaurantCard from "../../components/RestarentCard/RestaurantCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllRestaurantsAction,
  getRestaurantById,
  getRestaurantsCategory,
} from "../../../State/Customers/Restaurant/restaurant.action";
import { getMenuItemsByRestaurantId } from "../../../State/Customers/Menu/menu.action";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarIcon from "@mui/icons-material/Star";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import TuneIcon from "@mui/icons-material/Tune";

/* ── Filter config ─────────────────────────────────────── */
const foodTypes = [
  { label: "All", value: "all" },
  { label: "Veg Only", value: "vegetarian" },
  { label: "Non-Veg Only", value: "non_vegetarian" },
  { label: "Seasonal", value: "seasonal" },
];

/* ═══════════════════════════════════════════════════════ */
const Restaurant = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { restaurant, menu } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  const decoded = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decoded);
  const foodType = searchParams.get("food_type");
  const foodCategory = searchParams.get("food_category");

  /* ── load data ── */
  useEffect(() => {
    dispatch(getRestaurantById({ jwt, restaurantId: id }));
    dispatch(
      getMenuItemsByRestaurantId({
        jwt,
        restaurantId: id,
        seasonal: foodType === "seasonal",
        vegetarian: foodType === "vegetarian",
        nonveg: foodType === "non_vegetarian",
        foodCategory: foodCategory || "",
      })
    );
    dispatch(getRestaurantsCategory({ restaurantId: id, jwt }));
    // load all restaurants once for the "Related" strip
    dispatch(getAllRestaurantsAction(jwt));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, foodType, foodCategory]);

  /* ── filter handlers ── */
  const handleFoodTypeFilter = (value) => {
    const sp = new URLSearchParams(location.search);
    if (value === "all") {
      sp.delete("food_type");
      sp.delete("food_category");
    } else {
      sp.set("food_type", value);
    }
    navigate({ search: `?${sp.toString()}` });
  };

  const handleCategoryFilter = (value) => {
    const sp = new URLSearchParams(location.search);
    if (value === "all") {
      sp.delete("food_category");
    } else {
      sp.set("food_category", value);
    }
    navigate({ search: `?${sp.toString()}` });
  };

  /* ── related restaurants (same city, exclude self) ── */
  const currentCity = restaurant.restaurant?.address?.city;
  const relatedRestaurants = restaurant.restaurants
    ?.filter(
      (r) =>
        r.id !== Number(id) &&
        (!currentCity || r.address?.city === currentCity)
    )
    .slice(0, 8);

  /* ── hero image ── */
  const heroImg =
    restaurant.restaurant?.images?.[0] ||
    "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg";

  return (
    <>
      {/* ═══════════ HERO ═══════════ */}
      <div className="rest-hero">
        <img className="rest-hero__img" src={heroImg} alt={restaurant.restaurant?.name} />
        <div className="rest-hero__overlay" />
        <div className="rest-hero__content">
          {/* Breadcrumb */}
          <p
            style={{
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.5)",
              marginBottom: 8,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            Home
            <span style={{ opacity: 0.4 }}>›</span>
            {restaurant.restaurant?.address?.country}
            <span style={{ opacity: 0.4 }}>›</span>
            {restaurant.restaurant?.name}
            <span style={{ opacity: 0.4 }}>›</span>
            <span style={{ color: "#e91e63" }}>Order Online</span>
          </p>

          <h1
            style={{
              fontSize: "clamp(1.6rem, 5vw, 2.8rem)",
              fontWeight: 800,
              color: "#fff",
              margin: "0 0 6px",
              lineHeight: 1.1,
            }}
          >
            {restaurant.restaurant?.name}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.9rem", maxWidth: 540 }}>
            {restaurant.restaurant?.description}
          </p>

          {/* Quick stats row */}
          <div style={{ display: "flex", gap: 18, marginTop: 14, flexWrap: "wrap" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 5, color: "#f59e0b", fontWeight: 700 }}>
              <StarIcon sx={{ fontSize: "1rem" }} /> 4.2
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 5, color: "rgba(255,255,255,0.55)", fontSize: "0.85rem" }}>
              <AccessTimeIcon sx={{ fontSize: "1rem" }} />
              {restaurant.restaurant?.openingHours || "Open Now"}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 5, color: "rgba(255,255,255,0.55)", fontSize: "0.85rem" }}>
              <LocationOnIcon sx={{ fontSize: "1rem" }} />
              {restaurant.restaurant?.address?.streetAddress},{" "}
              {restaurant.restaurant?.address?.city}
            </span>
          </div>
        </div>
      </div>

      {/* ═══════════ INFO BAR (pills) ═══════════ */}
      <div className="rest-info-bar">
        <span className="rest-info-pill">
          <RestaurantMenuIcon sx={{ fontSize: "0.85rem" }} />
          {restaurant.categories?.length || 0} Categories
        </span>
        <span className="rest-info-pill">
          <AccessTimeIcon sx={{ fontSize: "0.85rem" }} />
          {restaurant.restaurant?.openingHours || "Check Timings"}
        </span>
        <span className="rest-info-pill">
          <LocationOnIcon sx={{ fontSize: "0.85rem" }} />
          {restaurant.restaurant?.address?.city || "City"}
        </span>
        <span
          className="rest-info-pill"
          style={{
            background: restaurant.restaurant?.open
              ? "rgba(22,163,74,0.15)"
              : "rgba(220,38,38,0.15)",
            borderColor: restaurant.restaurant?.open
              ? "rgba(22,163,74,0.4)"
              : "rgba(220,38,38,0.4)",
            color: restaurant.restaurant?.open ? "#4ade80" : "#f87171",
          }}
        >
          {restaurant.restaurant?.open ? "● Open" : "● Closed"}
        </span>
      </div>

      {/* ═══════════ BODY ═══════════ */}
      <div className="restaurant-menu-shell lg:flex gap-8 relative">
        {/* ── Sidebar Filters ── */}
        <aside
          className="restaurant-menu-sidebar lg:sticky top-24 self-start"
        >
          {/* Food Type */}
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 14,
              padding: "16px",
              marginBottom: 16,
            }}
          >
            <p
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "rgba(255,255,255,0.4)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: 12,
              }}
            >
              <TuneIcon sx={{ fontSize: "0.95rem", marginRight: "0.35rem" }} />
              Food Type
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {foodTypes.map((ft) => (
                <button
                  key={ft.value}
                  className={`rest-filter-btn ${
                    (foodType || "all") === ft.value ? "active" : ""
                  }`}
                  style={{ textAlign: "left" }}
                  onClick={() => handleFoodTypeFilter(ft.value)}
                >
                  {ft.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          {restaurant?.categories?.length > 0 && (
            <div
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 14,
                padding: "16px",
              }}
            >
              <p
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.4)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: 12,
                }}
              >
                Category
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <button
                  className={`rest-filter-btn ${
                    !foodCategory || foodCategory === "all" ? "active" : ""
                  }`}
                  style={{ textAlign: "left" }}
                  onClick={() => handleCategoryFilter("all")}
                >
                  All
                </button>
                {restaurant.categories.map((cat) => (
                  <button
                    key={cat.name}
                    className={`rest-filter-btn ${
                      foodCategory === cat.name ? "active" : ""
                    }`}
                    style={{ textAlign: "left" }}
                    onClick={() => handleCategoryFilter(cat.name)}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* ── Menu Items ── */}
        <div className="restaurant-menu-list">
          <div className="restaurant-menu-heading">
            <div>
              <p className="restaurant-menu-eyebrow">Order Online</p>
              <h2>Recommended Dishes</h2>
            </div>
            <span>{menu?.menuItems?.length || 0} items</span>
          </div>
          {menu?.menuItems?.length === 0 && !menu.loading && (
            <div
              style={{
                textAlign: "center",
                padding: "60px 0",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              <RestaurantMenuIcon sx={{ fontSize: "3rem", marginBottom: 1 }} />
              <p style={{ fontSize: "1rem" }}>No items found for this filter.</p>
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {menu?.menuItems?.map((item, i) => (
              <MenuItemCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════ RELATED RESTAURANTS ═══════════ */}
      {relatedRestaurants?.length > 0 && (
        <div
          style={{
            padding: "32px 40px",
            borderTop: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <h2
            style={{
              fontSize: "1.3rem",
              fontWeight: 700,
              color: "#f0f0f0",
              marginBottom: 20,
            }}
          >
            More Restaurants Near You
          </h2>
          <div className="related-strip">
            {relatedRestaurants.map((r, i) => (
              <div key={r.id} style={{ flexShrink: 0 }}>
                <RestaurantCard data={r} index={i} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══════════ LOADING BACKDROP ═══════════ */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={menu.loading || restaurant.loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Restaurant;
