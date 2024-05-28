import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API_URL from "../..";
import axios from "axios";
import Movies from '../MovieBanner/Movies';
import { useYourContext } from '../../Context';


function ActorDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [actor, setActor] = useState(null);
  // setAuthorId(id)
  const {
    author_id, setAuthorId
} = useYourContext();

  useEffect(() => {
    // Fetch actor details using the actor ID from route params
    axios.get(API_URL + `/api/author/${id}`)
      .then(response => {
        setActor(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching actor details:', error);
      });
    setAuthorId(id)
  }, [id]);

  if (!actor) {
    return <div>Loading...</div>;
  }


  return (
    <div>
      
      <Movies id={id}/>
    </div>
  );
}

export default ActorDetail;
