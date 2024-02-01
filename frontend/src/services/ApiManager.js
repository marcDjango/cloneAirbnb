const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/api/`;

const getToken = () => JSON.parse(localStorage.getItem("token"));

const setToken = (key, token) => localStorage.setItem(key, token);

const getConfig = () => {
  const config = { headers: {} };
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

const get = async (endpoint) => {
  try {
    const response = await fetch(baseUrl + endpoint, getConfig());
    handleErrors(response);
    return response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const post = async (endpoint, content) => {
  try {
    const response = await fetch(baseUrl + endpoint, {
      method: "POST",
      headers: {
        ...getConfig().headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    });
    handleErrors(response);
    return response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const put = async (endpoint, content) => {
  try {
    const response = await fetch(baseUrl + endpoint, {
      method: "PUT",
      headers: {
        ...getConfig().headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    });
    handleErrors(response);
    return response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const del = async (endpoint) => {
  try {
    const response = await fetch(baseUrl + endpoint, {
      method: "DELETE",
      ...getConfig(),
    });
    handleErrors(response);
    return response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default {
  getToken,
  setToken,
  getConfig,
  get,
  post,
  put,
  del,
};
