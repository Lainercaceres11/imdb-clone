import { CardGrid } from "../../../components";
import { getMoviesBySearch } from "../../../services";

export default async function SearchPage({ params }) {
  const { searchTerm } = await params;

  const results = await getMoviesBySearch(searchTerm);

  return (
    <div>
      {!results ||
        (results.length === 0 && (
          <h1 className="text-center pt-6">No results found</h1>
        ))}
      {results && results.length !== 0 && <CardGrid movies={results} />}
    </div>
  );
}
