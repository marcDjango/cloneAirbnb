import ApiManager from "./ApiManager";

/**
|--------------------------------------------------
|                   Method Get
|--------------------------------------------------
*/
export const fetchData = async (endpoint, setData = null) => {
  try {
    const data = await ApiManager.get(endpoint);
    if (setData) {
      // Si setData est fourni, utilisez-le pour mettre à jour l'état
      setData(data);
    }
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};

export const fetchListeningById = async (ListeningId) => {
  try {
    const data = await ApiManager.get(`listings/${ListeningId}`);
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des détails:", error);
    throw error;
  }
};

export const FetchReviewsByListings = async (ListingId, setDataReviews) => {
  try {
    const data = await ApiManager.get(`listings/${ListingId}/reviews`);
    if (data) {
      setDataReviews(data);
    }
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const FetchAmenitiesByListings = async (ListingId, setDataAmenities) => {
  try {
    const data = await ApiManager.get(`listings/${ListingId}/amenities`);
    if (data) {
      setDataAmenities(data);
    }
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const FetchImagesByListing = async (ListingId, setData = null) => {
  try {
    const data = await ApiManager.get(`listings/${ListingId}/images`);
    if (setData) {
      setData(data);
    }
    return data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};
export const FetchAmenitiesByListing = async (ListingId, setDataImages) => {
  try {
    const data = await ApiManager.get(`listings/${ListingId}/images`);
    if (data) {
      setDataImages(data);
    }
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};
/**
|--------------------------------------------------
|                   Method POST
|--------------------------------------------------
*/
export const FetchLogin = async (content) => {
  try {
    const data = await ApiManager.post("users/login", content);
    ApiManager.setToken("token", JSON.stringify(data.token));
    ApiManager.setToken("user", JSON.stringify(data.user));
    return data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const FetchNewListing = async (content) => {
  try {
    const data = await ApiManager.post("listings", content);
    return data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};
export const FetchNewAmenities = async (content) => {
  const data = await ApiManager.post("listingAmenities", content);
  try {
    return data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};
