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

  console.log(product);

  if (!product) return <p>Loading...</p>;

  return ( 
    <div className="w-full min-h-screen bg-gray-300 p-1">

      <div className="p-5 m-10 bg-zinc-100 flex gap-20 rounded-xl justify-center">
        <div className="w-[65vh] h-[60vh]  ">
        <img src={product.images} alt={product.title} className=" w-full h-full object-fill relative top-[-8%]" />
        </div>

      <div className="flex flex-col gap-5  px-2 w-[50vw]" >
      <h1 className="text-4xl font-bold">{product.title}</h1>
      <p className="w-[80%]" >{product.description}</p>
      <p className="text-xl"><span className="font-semibold" >Price:- </span>${product.price}</p>
      <h3 className="text-xl"><span className="font-semibold" >Brand:- </span>  {product.brand}</h3>
      <h3 className="text-xl"><span className="font-semibold" >Rating:- </span>  {product.rating}</h3>
      <h3 className="text-xl"><span className="font-semibold" >Return Policy:- </span>  {product.returnPolicy}</h3>  
      <h3 className="text-xl"><span className="font-semibold" >warranty Info:- </span>  {product.warrantyInformation}</h3>  
      <h3 className="text-xl"><span className="font-semibold" >Price:- </span> {product.minimumOrderQuantity}</h3>  

      <div className="flex gap-8" >
      <button onClick={() => addToCart(product)} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Add to Cart</button>
      <button onClick={() => addToWishlist(product)} className="bg-pink-500 text-white px-4 py-2 rounded-lg ">❤️ Wishlist</button>
      </div>
      </div>


      </div>

     <div className="ml-10" >
     <h1>Review</h1>
    <div className="flex gap-5" >
    {product.reviews.map((data,index)=>{
        return(
          <div key={index} className="w-[30vh] h-[30vh] bg-blue-400">
              
          </div>
        )
      })}
    </div>
     </div>


    </div>
  );
};

export default ProductDetail;
