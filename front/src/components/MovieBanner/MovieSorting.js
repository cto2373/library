import { useState } from "react";
import { useYourContext } from "../../Context.js";

export default function MovieSorting() {
  const [isMenuVisible, setMenuVisibility] = useState(false);
  const { sort, setSort } = useYourContext();

  const sortName = ["-year", "title", "-starRating"];
  const sortProperty = {
    "-year": "По новизне",
    title: "По названию",
    "-starRating": "По оценке",
  };

  const handleMouseEnter = () => {
    setMenuVisibility(isMenuVisible ? false : true);
  };

  return (
    <div>
      <div className="relative group transition-all z-10 w-64  inline-block">
        <button
          className="bg-blue-500 peer text-white font-bold w-full hover:bg-blue-900 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleMouseEnter}
        >
          {sortProperty[sort]}
        </button>

        <div
          className={`absolute duration-300 top-6 mt-2 p-0 bg-white 
        ${
          isMenuVisible
            ? "opacity-100 visible translate-y-2"
            : "invisible opacity-0"
        }
        rounded transition-all w-full h-max`}
        >
          {sortName.map((name) => (
            <button
              className={`rounded transform inline-block hover:bg-sky-400  
          ${sort === name ? "bg-cyan-700 " : ""} 
          w-full m-0 p-2 top-10 `}
              onClick={() => {
                setSort(name);
                handleMouseEnter();
              }}
            >
              {sortProperty[name]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
