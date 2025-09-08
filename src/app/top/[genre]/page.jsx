import { CardGrid } from "../../../components";
import { SearchBox } from "../../../components/search-box";
import { getMoviesByGenre } from "../../../services";

export default async function TopPage({ params }) {
  const { genre } = await params;
  const moviesByGenre = await getMoviesByGenre(genre);
  return (
    <div>
      <SearchBox />
      <CardGrid movies={moviesByGenre} />
    </div>
  );
}
