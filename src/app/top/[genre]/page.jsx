import { CardGrid } from "../../../components";
import { getMoviesByGenre } from "../../../services";

export default async function TopPage({ params }) {
  const { genre } = await params;
  const moviesByGenre = await getMoviesByGenre(genre);
  return (
    <div>
      <CardGrid movies={moviesByGenre} />
    </div>
  );
}
