import { CardGrid } from "../components";
import { getMovies } from "../services";

export default async function Home() {
  const movies = await getMovies();

  return <CardGrid movies={movies} />;
}
