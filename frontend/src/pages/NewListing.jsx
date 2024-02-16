/*eslint-disable*/
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { newListing } from "../components/Form/dataForm";
import Input from "../components/Form/input";
import {
  FetchNewAmenities,
  FetchNewListing,
  fetchData,
} from "../services/ApiController";

const FormModel = () => {
  const [previewSource, setPreviewSource] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [amenitiesList, setAmenitiesList] = useState(null);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const handleAmenitiesChange = (event) => {
    const amenity = parseInt(event.target.value, 10);
    // Vérifiez si l'aménité est déjà sélectionnée
    if (selectedAmenities.includes(amenity)) {
      // Si oui, la retire de la liste
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
    } else {
      // Sinon, l'ajoute à la liste
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  useEffect(() => {
    if (isLoading) {
      fetchData("amenities", setAmenitiesList);
    }
  }, []);

  const previewFile = (file) => {
    const reader = new FileReader();
    console.info(reader);
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  // Se déclenche à la sélection d'un fichier image, puis appelle previewFile
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  // Se déclenche au submit du formulaire et passe à uploadImage l'URL base64 de l'image
  const handleSubmitFile = async (e) => {
    e.preventDefault();
    if (!previewSource) return;
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    delete data.image;
    delete data.amenities;

    const listingId = await FetchNewListing(data);
    if (selectedAmenities && selectedAmenities.length > 0) {
      if (selectedAmenities.length > 1) {
        // Si plusieurs éléments sont sélectionnés
        selectedAmenities.map((element) => (
          FetchNewAmenities({listing_id: listingId, amenity_id: element })
        ));
      } else {
        // Si un seul élément est sélectionné
        const element = selectedAmenities[0];
        const amenityData = {
          listing_id: listingId,
          amenity_id: element,
        };
        // Utilisez la nouvelle variable amenityData dans votre logique
        FetchNewAmenities(amenityData);
      }
    }

    uploadImage(previewSource, listingId);
  };

  // Post l'url du fichier image, ainsi que les autres champs de la table photo sur cloudinary puis sur la database
  const uploadImage = async (base64EncodedImage, listingId) => {
    const objectToPost = {};
    objectToPost.image = base64EncodedImage;
    objectToPost.listing_id = listingId;

    const token = localStorage.getItem("token");

    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/images/upload`, {
        method: "POST",
        body: JSON.stringify({ objectToPost }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <form className="df-column" onSubmit={handleSubmitFile}>
        <label className="label">
          <div className="image">
            {previewSource ? (
              <img src={previewSource} alt="chosen" />
            ) : (
              <img className="preview-image" src="" alt="chosen" />
            )}
          </div>
          <input
            id="image"
            type="file"
            name="image"
            onChange={handleFileInputChange}
          />
        </label>
        {Object.keys(newListing).map((fieldName) =>
          newListing[fieldName].type !== "select" ? (
            <Input
              key={fieldName}
              name={fieldName}
              type={newListing[fieldName].type}
              placeholder={newListing[fieldName].value}
              required={newListing[fieldName].option === "required"}
            />
          ) : (
            <p>select</p>
          )
        )}
        {/* Section pour les équipements */}
        <label className="label">
          <p>Sélectionnez les équipements :</p>
          {amenitiesList &&
            amenitiesList.map((amenity) => {
              return (
                <div key={amenity.id}>
                  <input
                    type="checkbox"
                    name="amenities"
                    value={amenity.id}
                    onChange={handleAmenitiesChange}
                  />
                  <label htmlFor={amenity.id}>{amenity.name}</label>
                </div>
              );
            })}
        </label>
        <button className="signin-btn-submit" type="submit">
          Valider
        </button>
      </form>
    </div>
  );
};

export default FormModel;
