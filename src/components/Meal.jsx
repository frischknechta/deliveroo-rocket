import { memo } from "react";

const Meal = ({ meal, handleAddToCart }) => {
  console.log("Meal Render");
  return (
    <div
      className="mb-8 box-border flex h-40 w-[48%] justify-between rounded-xl bg-white p-2.5"
      onClick={() => {
        handleAddToCart(meal);
      }}
    >
      <div>
        <p>{meal.title}</p>
        {meal.description && (
          <div className="description-container">
            <p>{meal.description}</p>
          </div>
        )}
        <div className="price-popular-container">
          <p>{meal.price} €</p>
          {meal.popular && <p style={{ color: "orange" }}>popular</p>}
        </div>
      </div>
      {meal.picture && (
        <img
          src={meal.picture}
          alt=""
          className="ml-4 h-32 w-32 rounded-xl object-cover"
        />
      )}
    </div>
  );
};

export default memo(Meal);
