import React from "react";

const categories = [
  { name: "Vegetable", image: "/CategoryImage/Vegetable.webp" },
  { name: "Seafood", image: "/CategoryImage/milk.png" },
  { name: "Eggs", image: "/CategoryImage/eggs-1.jpg" },
  { name: "Baking", image: "/CategoryImage/milk.png" },
  { name: "Cheese", image: "/CategoryImage/Vegetable.webp" },
  { name: "Fresh Fruit", image: "/CategoryImage/milk.png" },
  { name: "Meat", image: "/CategoryImage/eggs-1.jpg" },
  { name: "Milk", image: "/CategoryImage/milk.png" },
  { name: "Drinks", image: "/CategoryImage/Vegetable.webp" },
  { name: "Electronics", image: "/CategoryImage/eggs-1.jpg" },
  { name: "Milk", image: "/CategoryImage/milk.png" },
  { name: "Drinks", image: "/CategoryImage/Vegetable.webp" },
];

const CategoryScroller = () => {
  return (
    <section className="px-4 sm:px-8 py-8">
      <h2 className="text-2xl font-bold mb-5 text-gray-800">
        Shop by Category
      </h2>

      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
        <div className="flex space-x-4 w-max">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="min-w-[100px] sm:min-w-[120px] bg-white rounded-xl shadow p-3 flex flex-col items-center justify-center hover:shadow-lg transition-all duration-300"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 mb-2 overflow-hidden rounded-full border-2 border-blue-500">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm font-medium text-gray-700 text-center">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryScroller;
