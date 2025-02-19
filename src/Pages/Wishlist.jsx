import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";

const Wishlist = () => {
  const { wishlist, setWishlist } = useContext(ShopContext);

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Your Wishlist</h1>
      {wishlist.length === 0 ? <p>Your wishlist is empty.</p> : (
        <ul>
          {wishlist.map((item) => (
            <li key={item.id} className="border p-4 rounded mb-2">
              <h2 className="font-bold">{item.title}</h2>
              <button onClick={() => removeFromWishlist(item.id)} className="bg-red-500 text-white px-4 py-2 rounded">Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Wishlist;
