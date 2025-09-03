import { CardGrid } from "../components";

const API_KEY = process.env.API_KEY;
const API_URL = "https://api.themoviedb.org/3/trending/all/week";

const getMovies = async () => {
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

export default async function Home() {
  const movies = await getMovies();
  console.log("Peliculas", movies);

  return (
    <div>
      <CardGrid movies={movies} />
    </div>
  );
}
