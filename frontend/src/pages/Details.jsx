import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FetchAmenitiesByListings,
  FetchImagesByListing,
  FetchReviewsByListings,
} from "../services/ApiController";

function Details() {
  const dataLoad = useLoaderData();

  const [isDataReviews, setIsDataReviews] = useState("");
  const [dataAmenities, setDataAmenities] = useState("");
  const [dataImages, setDataImages] = useState(null);

  useEffect(() => {
    FetchReviewsByListings(dataLoad.id, setIsDataReviews);
    FetchAmenitiesByListings(dataLoad.id, setDataAmenities);
    FetchImagesByListing(1, setDataImages);
  }, [dataLoad]);
  return (
    <div className="body-center">
      <div className="w100h100">
        <div className="bd">
          <div>
            {dataImages && (
              <img
                className="card-détails"
                src={dataImages[0].url}
                alt={dataLoad.title}
              />
            )}
          </div>
          <div className="bd">
            <h1>{dataLoad.title}</h1>
            <p>{dataLoad.description}</p>
            <p className="price-listing">{dataLoad.price} par nuit</p>
          </div>
          <div>
            {isDataReviews &&
              isDataReviews.comments.map((item) => {
                return (
                  <div key={item.id} className="">
                    <p>{item.rating}</p>
                    <p>{item.comment}</p>
                    <p>{item.author_name}</p>
                  </div>
                );
              })}
          </div>
          <div>
            {dataAmenities &&
              dataAmenities.map((item) => {
                return (
                  <div key={item} className="">
                    <p>{item}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
