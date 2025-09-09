import { CardGrid } from "../components";
import { SearchBox } from "../components/search-box";
import { getMovies } from "../services";

import { Pagination } from "../components/pagination";

export default async function Home({ searchParams }) {
  const page = Number(searchParams.page) || 1;
  const movies = await getMovies(page);

  return (
    <div>
      <SearchBox />
      <CardGrid movies={movies} />

      {movies.length >= 1 && <Pagination currentPage={page} />}
    </div>
  );
}
