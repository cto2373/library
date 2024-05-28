import React, { useEffect, useMemo, useState } from "react";

const GuideWrapper = React.memo(() => {
  const [is_hidden, setHidden] = useState(true);
  function toggle_display() {
    is_hidden ? setHidden(false) : setHidden(true);
  }

  const three = (
    <button
      type="button"
      className="w-10 h-10 mt-4 rounded-full items-center justify-center flex flex-col hover:bg-black hover:bg-opacity-50"
      onClick={toggle_display}
    >
      <div class="h-0.5 w-5  bg-gray-500 my-0.5 "></div>
      <div class="h-0.5 w-5  bg-gray-500 my-0.5 "></div>
      <div class="h-0.5 w-5 bg-gray-500 my-0.5 "></div>
    </button>
  );

  return (
    <>
      <div
        className={`w-screen 
          h-screen 
          absolute 
          z-10 
          bg-black 
          bg-opacity-50 
          ${is_hidden ? "hidden" : "block"}`}
        type="button"
        onClick={toggle_display}
      ></div>

      {three}

      <div
        className={`absolute 
        z-20 
        ${is_hidden ? "hidden" : "block"} 
        bg-white 
        h-screen 
        w-60 `}
      >
        {three}
      </div>
    </>
  );
});

export default GuideWrapper;
//
