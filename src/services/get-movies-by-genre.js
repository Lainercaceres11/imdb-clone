import { API_KEY } from "./const";

const URL_GENRE = "https://api.themoviedb.org/3";

export const getMoviesByGenre = async (genre, page) => {
  try {
    const response = await fetch(
      `${URL_GENRE}${
        genre === "rated" ? "/movie/top_rated" : "/trending/all/week"
      }?api_key=${API_KEY}&language=en-US&page=${page}`
    );
    if (!response.ok) {
      throw new Error("Error getting movies by genre");
    }

    const data = await response.json();

    return data.results ?? [];
  } catch (error) {
    console.log("Error getting movies", error);
  }
};
