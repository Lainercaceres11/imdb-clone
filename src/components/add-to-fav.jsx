"use client";

import { useUser } from "@clerk/nextjs";
import { useFavorites } from "../hooks/use-favorite";

export const AddToFav = ({
  isFav,
  movieId,
  title,
  image,
  overview,
  releaseDate,
  voteCount,
}) => {
  const { toggleFavorite } = useFavorites();

  const { isSignedIn } = useUser();

  const handleClick = async () => {
    const movie = {
      movieId,
      title,
      image,
      description: overview,
      dateReleased: releaseDate,
      rating: voteCount,
    };
    await toggleFavorite(movie);
  };

  return (
    <button
      disabled={!isSignedIn}
      onClick={handleClick}
      className={`p-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed ${
        isFav ? "bg-red-300 dark:bg-red-600" : "bg-gray-300 dark:bg-gray-600"
      }`}
    >
      {isFav ? "Remove from favorites" : "Add to favorites"}
    </button>
  );
};
