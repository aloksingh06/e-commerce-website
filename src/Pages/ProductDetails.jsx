import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { motion } from "framer-motion";


const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart, addToWishlist } = useContext(ShopContext);

  const [added, setAdded] = useState(false);
  const handleClickCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000); // 2 sec baad wapas "Add to Cart"
  };

  const [wishlist, setwishlist] = useState(false);
  const handleClickWishlist = () => {
    addToWishlist(product);
    setwishlist(true);
    setTimeout(() => setwishlist(false), 2000); // 2 sec baad wapas "Wishlist"
  };


  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  console.log(product);

  if (!product) return <p>Loading...</p>;

  return ( 
    <div className="w-full min-h-screen bg-gray-400 p-1">

      <div className="p-5 m-2 bg-zinc-100 flex gap-20 rounded justify-center">
        <div className="w-[65vh] h-[60vh]  ">
        <img src={product.thumbnail} alt={product.title} className=" w-full h-full object-fill relative top-[-8%]" />
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
      <motion.button
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.1, ease: "easeInOut" }}
      onClick={handleClickCart}
      className={`px-4 py-2 rounded-lg ${
        added ? "bg-green-500" : "bg-blue-500"
      } text-white`}
    >
      {added ? "Added" : "Add to Cart"}
    </motion.button>
    <motion.button
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.1, ease: "easeInOut" }}
      onClick={handleClickWishlist}
      className={`px-4 py-2 rounded-lg ${
        wishlist ? "bg-green-500" : "bg-pink-500"
      } text-white`}
    >
      {wishlist ? "Done" : "Wishlist"}
    </motion.button>
      </div>
      </div>


      </div>

     <div className="m-2 w-[98vw] p-5  bg-zinc-100 rounded" >
     <h1 className="text-2xl mb-3" >Review:-</h1>
    <div className="flex gap-5 justify-between px-20" >
    {product.reviews.map((data,index)=>{
        return(
          <div key={index} className="w-[50vh] h-[30vh] p-5 rounded-lg bg-gray-300">
              <h3>Comment:  {data.comment} </h3>
              <h3>Date:  {data.date} </h3>
              <h3>Rating:  {data.rating} </h3>
              <h3>reviewer Email:  {data.reviewerEmail} </h3>
              <h3>Reviewer Name:  {data.reviewerName} </h3>


          </div>
        )
      })}
    </div>
     </div>


    </div>
  );
};

export default ProductDetail;
