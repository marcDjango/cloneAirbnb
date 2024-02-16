/* eslint-disable no-await-in-loop */
import { Link, useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import { FetchImagesByListing } from "./services/ApiController";
import "./App.css";

function App() {
  const dataLoad = useLoaderData();
  const [dataImages, setDataImages] = useState({});

  useEffect(() => {
    const fetchDataImages = async () => {
      const imagesData = {};
      for (const item of dataLoad) {
        try {
          const images = await FetchImagesByListing(item.id);
          imagesData[item.id] = images;
        } catch (error) {
          console.error(`Error fetching images for listing ${item.id}:`, error);
          // Handle the error as needed
        }
      }
      setDataImages(imagesData);
    };

    fetchDataImages();
  }, [dataLoad]);

  return (
    <div className="df-row">
      {dataLoad &&
        dataLoad.map((element) => (
          <div key={element.id} className="df-column">
            <div>
              {dataImages[element.id] && dataImages[element.id].length > 0 && (
                <img
                  className="card-listenings"
                  src={dataImages[element.id][0].url}
                  alt={element.title}
                />
              )}
            </div>
            <p>
              <Link
                className="title-listing"
                to={`listings/details/${element.id}`}
              >
                {element.title}
              </Link>
            </p>
            <p>{element.description}</p>
            <span className="row">
              <p className="price-listing">{element.price}</p>
              <p> par nuit</p>
            </span>
          </div>
        ))}
    </div>
  );
}

export default App;
