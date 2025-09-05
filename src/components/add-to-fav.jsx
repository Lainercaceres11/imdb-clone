"use client";

import { useState, useTransition } from "react";
import { toggleFavorite } from "../actions/toggleFavorite";
import { useAuth } from "@clerk/clerk-react";

export const AddToFav = ({
  movieId,
  title,
  image,
  overview,
  releaseDate,
  voteCount,
}) => {
  const [isFav, setIsFav] = useState(false);
  const [isPending, startTransition] = useTransition();

  const { isLoaded, userId } = useAuth();

  if (!isLoaded || !userId) {
    return <button disabled>Cargando...</button>;
  }

  const handleFavClick = () => {
    const payloadUser = {
      movieId,
      title,
      image,
      description: overview,
      dateReleased: releaseDate,
      rating: voteCount,
    };
    startTransition(async () => {
      const res = await toggleFavorite(payloadUser, userId);

      if (res.success) {
        setIsFav(res.favs.some((f) => f.movieId === movieId));
      }
    });
  };

  return (
    <button
      onClick={handleFavClick}
      className={`p-2 rounded ${
        isFav ? "bg-red-300 dark:bg-red-600" : "bg-gray-300 dark:bg-gray-600"
      }`}
      disabled={isPending}
    >
      {isPending
        ? "Loading..."
        : isFav
        ? "Remove from Favorites"
        : "Add to Favorites"}
    </button>
  );
};
