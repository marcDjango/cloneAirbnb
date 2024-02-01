import ApiManager from "./ApiManager";

export const fetchData = async (endpoint) => {
  try {
    const data = await ApiManager.get(endpoint);
    // Faire quelque chose avec les données ici
    if (data) {
      return data;
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    // Gérer l'erreur ici
    throw error;
  }
  return null;
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
