"use client";

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
      onClick={handleClick}
      className={`p-2 rounded ${
        isFav ? "bg-red-300 dark:bg-red-600" : "bg-gray-300 dark:bg-gray-600"
      }`}
    >
      {isFav ? "Remove from favorites" : "Add to favorites"}
    </button>
  );
};
