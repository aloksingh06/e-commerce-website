import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { ShopContext } from "../Context/ShopContext";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart, addToWishlist } = useContext(ShopContext);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <img src={product.thumbnail} alt={product.title} className="w-64" />
      <p>{product.description}</p>
      <p className="font-bold">${product.price}</p>
      <button onClick={() => addToCart(product)} className="bg-blue-500 text-white p-2 rounded">Add to Cart</button>
      <button onClick={() => addToWishlist(product)} className="bg-pink-500 text-white p-2 rounded ml-2">❤️ Wishlist</button>
    </div>
  );
};

export default ProductDetail;
