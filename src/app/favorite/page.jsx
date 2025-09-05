import { auth, currentUser } from "@clerk/nextjs/server";

import { getUserFavs } from "../../actions/getUserFavorites";

export default async function Favorites() {
  const { userId } = await auth();
  console.log(userId);

  const favoritesMovies = await getUserFavs(userId);

  
  return (
    <div>
      {!favoritesMovies ||
        (favoritesMovies.length === 0 && (
          <h1 className="text-center pt-6">No results found</h1>
        ))}
      {favoritesMovies && favoritesMovies.length !== 0 && (
        <CardGrid
          movies={favoritesMovies.map((result) => ({
            ...result,
            id: result.movieId,
            title: result.title,
            backdrop_path: result.image,
            overview: result.description,
            first_air_date: result.dateReleased.substring(0, 10),
            vote_count: result.rating,
          }))}
        />
      )}
    </div>
  );
}
