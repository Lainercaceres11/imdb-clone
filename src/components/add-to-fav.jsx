"use client";

import { useUser } from "@clerk/nextjs";
import { useFavorites } from "../hooks/use-favorite";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

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
  const [isPending, startTransition] = useTransition();

  const { isSignedIn } = useUser();
  const router = useRouter();

  const handleClick = async () => {
    const movie = {
      movieId,
      title,
      image,
      description: overview,
      dateReleased: releaseDate,
      rating: voteCount,
    };

    startTransition(async () => await toggleFavorite(movie));
    router.push("/favorite");
  };

  return (
    <button
      disabled={!isSignedIn}
      onClick={handleClick}
      className={`p-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed ${
        isFav ? "bg-red-300 dark:bg-red-600" : "bg-gray-300 dark:bg-gray-600"
      }`}
    >
      {isPending
        ? "Loading..."
        : isFav
        ? "Remove from favorites"
        : "Add to favorites"}
    </button>
  );
};
