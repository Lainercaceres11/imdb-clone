import { CardGrid, Pagination } from "../../../components";
import { SearchBox } from "../../../components/search-box";
import { getMoviesByGenre } from "../../../services";

export default async function TopPage({ params, searchParams }) {
  const page = Number(searchParams.page) || 1;
  const { genre } = await params;
  const moviesByGenre = await getMoviesByGenre(genre, page);
  return (
    <div>
      <SearchBox />
      <CardGrid movies={moviesByGenre} />
      {moviesByGenre.length >= 1 && (
        <Pagination currentUrl={`/top/${genre}`} currentPage={page} />
      )}
    </div>
  );
}
