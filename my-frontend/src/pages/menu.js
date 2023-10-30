import React, { useEffect } from "react";
import DataService from "../services/itemData";
import { Link } from "react-router-dom";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Menu = (props) => {
  // react hook, keeps track of items
  const [items, setItems] = useState([]);

  // tells react hooks that it needs to do something after render.
  useEffect(() => {
    retrieveItems();
  }, []);

  const retrieveItems = () => {
    DataService.getAll()
      .then((response) => {
        setItems(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <div className="row">
        {!Array.isArray(items)
          ? items.item.map((currentItem) => {
              return (
                <div className="col-lg-4 pb-1">
                  <div className="card">
                    <div className="card-body">
                      <Link to={`/details/${currentItem._id}`}>
                        <img
                          style={{ maxWidth: 300, maxHeight: 300 }}
                          src={currentItem.photo}
                          alt={"Photo of " + currentItem.name}
                        />
                      </Link>
                      <h5 className="card-title">{currentItem.name}</h5>
                      <p className="card-text">
                        <strong>Category: </strong>
                        {currentItem.category}
                        <br />
                        <strong>Price: </strong>${currentItem.price / 100}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Menu;
