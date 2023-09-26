import { useContext, useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import "./category.styles.scss";
import { CategoriesContext } from "../../context/categories.context";
import ProductCard from "../product-card/product-card.component";
import { toast, ToastContainer } from "react-toastify";
const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState(categoriesMap[category] || []);

  useEffect(() => {
    setProducts(categoriesMap[category] || []);
  }, [categoriesMap, category]);

  return (
    <Fragment>
      <ToastContainer />
      <h2 className="category-title">{category.toUpperCase()}</h2>
      <div className="category-container">
        {products
          .filter((product) => product)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </Fragment>
  );
};

export default Category;
