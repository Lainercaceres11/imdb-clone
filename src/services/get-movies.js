import { API_KEY, API_URL } from "./const";

export const getMovies = async () => {
  try {
    const response = await fetch(
      `${API_URL}?api_key=${API_KEY}&language=en-US&page=1`
    );
    if (!response.ok) {
      throw new Error("Error getting movies");
    }

    const data = await response.json();

    return data.results ?? [];
  } catch (error) {
    console.log("Error getting movie", error);
  }
};
