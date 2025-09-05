import { API_KEY, API_URL } from "./const";

export const getMoviesBySearch = async (search) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}&language=en-US&page=1&include_adult=false`
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
