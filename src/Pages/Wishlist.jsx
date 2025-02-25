import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";

const Wishlist = () => {
  const { wishlist, setWishlist } = useContext(ShopContext);

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="w-full h-16 flex justify-center items-center bg-blue-300">
      <h1 className="text-3xl font-bold text-center ">Your Wishlist</h1>
      </div>
      {wishlist.length === 0 ? (
        <p className="text-xl text-center">Your wishlist is empty.</p>
      ) : (
        <div className=" gap-6 p-10 flex">
          {wishlist.map((item) => (
            <div key={item.id} className="bg-white w-[20%] rounded-lg shadow-md overflow-hidden">
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-fill"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{item.title}</h2>
                {item.description && (
                  <p className="text-gray-600 text-sm mb-2">
                    {item.description.substring(0, 60)}...
                  </p>
                )}
                <p className="text-lg font-semibold mb-4 ">${item.price}</p>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="bg-red-500 hover:bg-red-600 transition-colors text-white px-4 py-2 rounded w-full "
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
