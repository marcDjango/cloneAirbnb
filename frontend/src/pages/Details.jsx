import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import { FetchReviewsByListings } from "../services/ApiController";

function Details() {
  const dataLoad = useLoaderData();

  const [isDataReviews, setIsDataReviews] = useState("");

  useEffect(() => {
    FetchReviewsByListings(dataLoad.id, setIsDataReviews);
  }, [dataLoad]);

  return (
    <div className="df-column card-listenings">
      <div>
        <p>
          <h1>{dataLoad.title}</h1>
        </p>
        <p>{dataLoad.description}</p>
        <p>{dataLoad.price}</p>
      </div>
      <div>
        {isDataReviews &&
          isDataReviews.comments.map((item) => {
            return (
              <div key={item.id} className="df-column card-listenings">
                <p>{item.rating}</p>
                <p>{item.comment}</p>
                <p>{item.author_name}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Details;
