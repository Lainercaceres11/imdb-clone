"use client";

import { use, useEffect, useState } from "react";
import { AddToFav } from "../../../components";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import Loading from "./loading";

export default function Movie({ params }) {
  const { id } = use(params);
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(null);
  const { userId } = useAuth();

  useEffect(() => {
    const getMovies = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/movie/${id}`);
        const data = await response.json();
        setMovie(data.movie || null);
      } catch (err) {
        console.error("Error fetching movie:", err);
        setMovie(null);
      } finally {
        setIsLoading(false);
      }
    };

    getMovies();
  }, [id]);

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      try {
        const res = await fetch(
          `/api/check-favorite?userId=${userId}&movieId=${id}`
        );
        const data = await res.json();
        setIsFavorite(data.isFav);
      } catch (err) {
        console.error("Error fetching favorites status:", err);
      }
    };

    if (userId) fetchFavoriteStatus();
  }, [id, userId]);

  if (isLoading) {
    return <Loading />;
  }

  if (!movie) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-xl my-5">
          Movie details are not available at the moment!
        </h1>
        <p>
          <Link href="/" className="hover:text-amber-600">
            Go Home
          </Link>
        </p>
      </div>
    );
  }
  return (
    <div className="w-full">
      <div className="p-4 md:pt-8 flex flex-col md:flex-row content-center max-w-6xl mx-auto md:space-x-6">
        <img
          src={`https://image.tmdb.org/t/p/original/${
            movie.backdrop_path || movie.poster_path
          }`}
          className="rounded-lg w-full md:w-96 h-56 object-cover"
        ></img>
        <div className="p-2">
          <h2 className="text-lg mb-3 font-bold">
            {movie.title || movie.name}
          </h2>
          <p className="text-lg mb-3">{movie.overview}</p>
          <p className="mb-3">
            <span className="font-semibold mr-1">Date Released:</span>
            {movie.release_date || movie.first_air_date}
          </p>
          <p className="mb-3">
            <span className="font-semibold mr-1">Rating:</span>
            {movie.vote_count}
          </p>
          <AddToFav
            isFav={isFavorite}
            movieId={id}
            title={movie.title || movie.name}
            image={movie.backdrop_path || movie.poster_path}
            overview={movie.overview}
            releaseDate={movie.release_date || movie.first_air_date}
            voteCount={movie.vote_count}
          />
        </div>
      </div>
    </div>
  );
}
