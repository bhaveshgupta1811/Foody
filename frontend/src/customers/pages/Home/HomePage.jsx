import React, { useEffect, useRef } from "react";
import "./HomePage.css";
import MultipleItemsCarousel from "../../components/MultiItemCarousel/MultiItemCarousel";
import RestaurantCard from "../../components/RestarentCard/RestaurantCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurantsAction } from "../../../State/Customers/Restaurant/restaurant.action";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { auth, restaurant } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sectionRef = useRef(null);

  useEffect(() => {
    if (auth.user) {
      dispatch(getAllRestaurantsAction(localStorage.getItem("jwt")));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user]);

  /* IntersectionObserver — fade-in-up on scroll */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-visible");
          }
        });
      },
      { threshold: 0.08 }
    );
    document
      .querySelectorAll(".observe-section")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [restaurant.restaurants]);

  return (
    <div className="homepage">
      {/* ═══════════ HERO BANNER ═══════════ */}
      <section className="banner relative flex flex-col justify-center items-center">
        <div className="banner__overlay" />
        <div className="banner__fade" />

        {/* Content */}
        <div className="banner__content z-10 text-center">
          <p className="banner__title">Foody</p>
          <p className="banner__subtitle">
            Taste the Convenience — Food, Fast &amp; Delivered.
          </p>

          {/* Quick Search Bar */}
          <div className="banner__search" onClick={() => navigate("/search")}>
            <SearchIcon sx={{ color: "rgba(0,0,0,0.5)", fontSize: "1.2rem" }} />
            <span style={{ color: "rgba(0,0,0,0.45)", fontSize: "0.9rem" }}>
              Search for dishes, restaurants…
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════ TOP MEALS CAROUSEL ═══════════ */}
      <section className="px-5 lg:px-20 py-10 observe-section section-init">
        <p className="section-heading">🔥 Top Meals</p>
        <MultipleItemsCarousel />
      </section>

      {/* ═══════════ RESTAURANT GRID ═══════════ */}
      <section className="px-5 lg:px-20 pb-16 observe-section section-init" ref={sectionRef}>
        <h1 className="section-heading">
          🍽️ Order From Our Handpicked Favourites
        </h1>

        {restaurant.restaurants.length === 0 ? (
          /* Skeleton placeholders */
          <div className="rest-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="skeleton"
                style={{ height: 280, borderRadius: 16 }}
              />
            ))}
          </div>
        ) : (
          <div className="rest-grid">
            {restaurant.restaurants.map((item, i) => (
              <RestaurantCard key={item.id} data={item} index={i} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
