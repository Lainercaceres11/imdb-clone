import { API_KEY, MOVIE_URL } from "./const";

export const getMovie = async (id) => {
  try {
    const response = await fetch(`${MOVIE_URL}/${id}?api_key=${API_KEY}`);
    if (!response.ok) {
      throw new Error("Error getting movie");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log("Error getting movie", error);
  }
};
