import React from "react";
import styled from "styled-components";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Details = () => {
  let [menuItem, setMenuItem] = useState();
  let params = useParams();

  useEffect(() => {
    retrieveMenuItem();
  }, []);

  const retrieveMenuItem = () => {
    let url = `http://localhost:5000/pizza/items?_id=${params.id}`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMenuItem(data[0]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <div>{menuItem ? <p>{menuItem.name}</p> : <p>Loading Name</p>}</div>
      <div>{menuItem ? <p>{menuItem.photo}</p> : <p>Loading Photo Url</p>}</div>
    </div>
  );
};

export default Details;
