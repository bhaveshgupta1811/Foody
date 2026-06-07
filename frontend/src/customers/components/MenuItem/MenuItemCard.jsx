import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../../State/Customers/Cart/cart.action";
import { categorizedIngredients } from "../../util/CategorizeIngredients";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const MenuItemCard = ({ item, index = 0 }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const delay = `${index * 60}ms`;

  const ingredientGroups = categorizedIngredients(item?.ingredients || []);
  const hasIngredients = Object.keys(ingredientGroups).length > 0;
  const isVeg = item?.vegetarian;

  const handleCheckboxChange = (name) => {
    setSelectedIngredients((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const handleAddToCart = (event) => {
    event.preventDefault();
    event.stopPropagation();
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
    setOpen(false);
    setSelectedIngredients([]);
  };

  return (
    <div
      className={`menu-card ${open ? "menu-card--open" : ""}`}
      style={{ "--delay": delay }}
    >
      <div
        className="menu-card__row"
        onClick={() => hasIngredients && setOpen((value) => !value)}
      >
        <div className="menu-card__media">
          {item.images?.[0] ? (
            <img className="menu-card__img" src={item.images[0]} alt={item.name} />
          ) : (
            <div className="menu-card__img menu-card__img--empty">No Image</div>
          )}
          {item.seasonal && <span className="menu-card__ribbon">Seasonal</span>}
        </div>

        <div className="menu-card__info">
          <div className="menu-card__topline">
            <span
              className={isVeg ? "veg-dot" : "nonveg-dot"}
              title={isVeg ? "Veg" : "Non-Veg"}
            />
            {!item.available && (
              <span className="menu-card__stock menu-card__stock--out">
                Out of Stock
              </span>
            )}
          </div>

          <p className="menu-card__name">{item.name}</p>
          <p className="menu-card__price">₹{item.price}</p>
          <p className="menu-card__desc">{item.description}</p>

          {hasIngredients && (
            <p className="menu-card__customizable">
              Customizable
              <KeyboardArrowDownIcon
                className="menu-card__chevron"
                sx={{ fontSize: "1rem" }}
              />
            </p>
          )}
        </div>

        {!hasIngredients && (
          <button
            className="menu-card__add-btn"
            onClick={handleAddToCart}
            disabled={!item.available}
          >
            {item.available ? (
              <>
                <AddShoppingCartIcon sx={{ fontSize: "1rem" }} />
                Add
              </>
            ) : (
              "Unavailable"
            )}
          </button>
        )}
      </div>

      {hasIngredients && open && (
        <div className="menu-card__ingredients-panel">
          <form onSubmit={handleAddToCart}>
            <div className="menu-card__panel-head">
              <div>
                <p className="menu-card__panel-title">Choose Add-ons</p>
                <p className="menu-card__panel-subtitle">
                  {selectedIngredients.length} selected
                </p>
              </div>
              <button
                className="menu-card__clear-btn"
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setSelectedIngredients([]);
                }}
              >
                Clear
              </button>
            </div>

            <div className="menu-card__ingredient-grid">
              {Object.keys(ingredientGroups).map((category) => (
                <div key={category} className="menu-card__ingredient-group">
                  <p className="menu-card__ingredient-category">{category}</p>
                  {ingredientGroups[category].map((ingredient) => (
                    <label
                      key={ingredient.name}
                      className={`menu-card__ingredient-option ${
                        selectedIngredients.includes(ingredient.name)
                          ? "is-selected"
                          : ""
                      } ${ingredient.inStoke ? "" : "is-disabled"}`}
                      onClick={() =>
                        ingredient.inStoke && handleCheckboxChange(ingredient.name)
                      }
                    >
                      {selectedIngredients.includes(ingredient.name) ? (
                        <CheckCircleIcon sx={{ fontSize: "1rem", color: "#fc8019" }} />
                      ) : (
                        <RadioButtonUncheckedIcon
                          sx={{ fontSize: "1rem", color: "rgba(255,255,255,0.38)" }}
                        />
                      )}
                      <span>{ingredient.name}</span>
                    </label>
                  ))}
                </div>
              ))}
            </div>

            <div className="menu-card__panel-actions">
              <button
                className="menu-card__add-btn"
                type="submit"
                disabled={!item.available}
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
