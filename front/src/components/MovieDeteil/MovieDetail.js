import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API_URL from "../..";
import axios from "axios";
import { API_STATIC_MEDIA } from "../..";
import { useYourContext } from "../../Context";
// import exampleImage from "../../../../newImage/images.jpg"

function MovieDetail() {
  const [book, setBook] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  
  function handleDelete() {
    axios
    .delete(API_URL + `/api/book/${id}`)
    .then((response) => {
      console.log("Book deleted:", response.data);
    })
    .catch((error) => {
      console.error("Error deleting book:", error);
    });
    navigate("/");
  }
  
  useEffect(() => {
    axios
    .get(API_URL + `/api/book/${id}`)
    .then((response) => {
      setBook(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error fetching book details:", error);
    });
  }, [id]);
  
  if (!book) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="bg-white flex my-8 justify-stretch mx-24 p-4">
        <div>
          <img
            src={API_STATIC_MEDIA + book.image}
            alt=""
            width="300"
            height="440"
            className="flex-none rounded-md  bg-slate-100"
          />
        </div>
        <svg viewBox="0 0 24 24" fill="#b34d00" width="24" height="24">
          <path
            d="M17.016 18V5.016H6.984V18L12 15.797 17.016 18zm0-15c.53 0 .984.203 1.359.61.406.406.61.874.61 
          1.406V21L12 18l-6.984 3V5.016c0-.532.187-1 .562-1.407C5.984 3.203 6.453 3 6.984 3h10.032z"
          ></path>
        </svg>

        <h1 className="font-bold px-4 text-4xl">
          {book.title} ({book.year.slice(0, 4)})
        </h1>
        <div>{book.summary}</div>
      </div>
      <div>
        {/* Book details */}
        <button className="text-white bg-red-500 rounded" onClick={handleDelete}>Delete Book</button>
      </div>
    </div>
  );
}

export default MovieDetail;
