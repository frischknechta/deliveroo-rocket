import Meal from "./Meal";
import { memo } from "react";

const Category = ({ category, handleAddToCart }) => {
  console.log("Category Render");

  return (
    <div className="category">
      <h2>{category.name}</h2>
      <div className="flex flex-wrap justify-between ">
        {category.meals.map((meal) => {
          return (
            <Meal key={meal.id} meal={meal} handleAddToCart={handleAddToCart} />
          );
        })}
      </div>
    </div>
  );
};

export default memo(Category);
