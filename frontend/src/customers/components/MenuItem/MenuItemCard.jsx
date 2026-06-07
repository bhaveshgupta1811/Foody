import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../../State/Customers/Cart/cart.action";
import { categorizedIngredients } from "../../util/CategorizeIngredients";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

const MenuItemCard = ({ item, index = 0 }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const delay = `${index * 60}ms`;

  const handleCheckboxChange = (name) => {
    setSelectedIngredients((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      addItemToCart({
        token: localStorage.getItem("jwt"),
        cartItem: {
          menuItemId: item.id,
          quantity: 1,
          ingredients: selectedIngredients,
        },
      })
    );
    // collapse panel after adding
    setOpen(false);
    setSelectedIngredients([]);
  };

  const hasIngredients =
    item?.ingredients && Object.keys(categorizedIngredients(item.ingredients)).length > 0;

  const isVeg = item?.vegetarian;

  return (
    <div className="menu-card" style={{ "--delay": delay }}>
      {/* ── Main Row ── */}
      <div
        className="menu-card__row"
        onClick={() => hasIngredients && setOpen((o) => !o)}
      >
        {/* Image */}
        {item.images?.[0] && (
          <img
            className="menu-card__img"
            src={item.images[0]}
            alt={item.name}
          />
        )}

        {/* Info */}
        <div className="menu-card__info">
          {/* Veg/Non-veg indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
            <span className={isVeg ? "veg-dot" : "nonveg-dot"} title={isVeg ? "Veg" : "Non-Veg"} />
            {!item.available && (
              <span
                style={{
                  fontSize: "0.68rem",
                  color: "#ef4444",
                  fontWeight: 600,
                  padding: "1px 7px",
                  borderRadius: 10,
                  background: "rgba(239,68,68,0.12)",
                }}
              >
                Out of Stock
              </span>
            )}
          </div>
          <p className="menu-card__name">{item.name}</p>
          <p className="menu-card__price">₹{item.price}</p>
          <p className="menu-card__desc">{item.description}</p>
          {hasIngredients && (
            <p
              style={{
                fontSize: "0.72rem",
                color: "#e91e63",
                marginTop: 6,
                fontWeight: 600,
              }}
            >
              Customizable ▾
            </p>
          )}
        </div>

        {/* Add button (shown when no ingredients or panel closed) */}
        {!hasIngredients && (
          <button
            className="menu-card__add-btn"
            onClick={handleAddToCart}
            disabled={!item.available}
          >
            {item.available ? "+ Add" : "Unavailable"}
          </button>
        )}
      </div>

      {/* ── Ingredient Panel ── */}
      {hasIngredients && open && (
        <div className="menu-card__ingredients-panel">
          <form onSubmit={handleAddToCart}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
              {Object.keys(categorizedIngredients(item.ingredients)).map(
                (category) => (
                  <div key={category}>
                    <p
                      style={{
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        color: "rgba(255,255,255,0.55)",
                        marginBottom: 8,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {category}
                    </p>
                    {categorizedIngredients(item.ingredients)[category].map(
                      (ingredient) => (
                        <label
                          key={ingredient.name}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            marginBottom: 8,
                            cursor: ingredient.inStoke ? "pointer" : "not-allowed",
                            opacity: ingredient.inStoke ? 1 : 0.4,
                          }}
                          onClick={() =>
                            ingredient.inStoke &&
                            handleCheckboxChange(ingredient.name)
                          }
                        >
                          {selectedIngredients.includes(ingredient.name) ? (
                            <CheckCircleIcon
                              sx={{ fontSize: "1rem", color: "#e91e63" }}
                            />
                          ) : (
                            <RadioButtonUncheckedIcon
                              sx={{
                                fontSize: "1rem",
                                color: "rgba(255,255,255,0.35)",
                              }}
                            />
                          )}
                          <span
                            style={{
                              fontSize: "0.82rem",
                              color: "rgba(255,255,255,0.75)",
                            }}
                          >
                            {ingredient.name}
                          </span>
                        </label>
                      )
                    )}
                  </div>
                )
              )}
            </div>
            <div style={{ marginTop: 16 }}>
              <button
                className="menu-card__add-btn"
                type="submit"
                disabled={!item.available}
                style={{ padding: "9px 28px", fontSize: "0.85rem" }}
              >
                {item.available ? "Add to Cart" : "Unavailable"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MenuItemCard;
