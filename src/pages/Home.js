/** @format */

import { useDispatch, useSelector } from "react-redux";
import { useProductsListener } from "../config/fireabase";
import { addProduct, deleteProduct } from "../redux/productSlice";
const Home = () => {
  const dispatch = useDispatch();
  useProductsListener();
  const products = useSelector((state) => state.products.products);
  return (
    <div>
      {products?.map((product, idx) => (
        <div
          key={idx}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            columnGap: "20px",
            border: "1px solid",
          }}
        >
          <h1>{product.name}</h1>
          <button
            onClick={() => {
              dispatch(deleteProduct(product.id));
            }}
          >
            Delete product
          </button>
        </div>
      ))}
      <button
        onClick={() => {
          dispatch(addProduct());
        }}
      >
        Add product
      </button>
    </div>
  );
};

export default Home;
