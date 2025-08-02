import { useParams } from "react-router-dom";
import "./category.styles.scss";
import { useContext, useEffect, useState } from "react";
import { CategoriesContext } from "../../context/categories.context";
import ProductCard from "../../components/product-card/product-card.component";

const Category = () => {
  const { category } = useParams();
  const { categories } = useContext(CategoriesContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (categories && categories[category]) {
      setProducts(categories[category]);
    } else {
      setProducts([]);
    }
  }, [category, categories]);
  return (
    <div className="container-category">
      <h2>{category}</h2>
      <div className="container-products">
        {products?.map((item) => {
          return <ProductCard key={item.id} product={item} />;
        })}
      </div>
    </div>
  );
};

export default Category;
