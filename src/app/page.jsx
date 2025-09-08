import { CardGrid } from "../components";
import { SearchBox } from "../components/search-box";
import { getMovies } from "../services";

export default async function Home() {
  const movies = await getMovies();

  return (
    <div>
      <SearchBox />
      <CardGrid movies={movies} />
    </div>
  );
}
