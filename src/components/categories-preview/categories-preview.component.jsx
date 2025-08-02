import { useContext } from "react";
import "./categories-preview.styles.scss";
import { CategoriesContext } from "../../context/categories.context";
import CategoryPreview from "../category-preview/category-preview.component";

const CategoriesPreview = () => {
  const { categories } = useContext(CategoriesContext);
  let SHOP_DATA = categories || [];

  return (
    <div>
      <h1>Welcome to our Shop !</h1>
      <div className="categories-preview">
        {Object.keys(SHOP_DATA)?.map((category) => {
          const products = SHOP_DATA[category];
          return <CategoryPreview key={category} title={category} products={products} />;
        })}
      </div>
    </div>
  );
};
export default CategoriesPreview;
