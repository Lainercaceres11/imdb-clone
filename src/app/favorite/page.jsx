"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { CardGrid } from "../../components";
import { SearchBox } from "../../components/search-box";

export default function FavoritesClient() {
  const { userId } = useAuth();
  const [favoritesMovies, setFavoritesMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchFavs = async () => {
      try {
        const res = await fetch(`/api/favorite?userId=${userId}`);
        const data = await res.json();
        setFavoritesMovies(data.favs || []);
      } catch (err) {
        console.error("Error fetching favorites:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavs();
  }, [userId]);

  if (!userId && !loading) {
    return <p className="text-center pt-6">Inicia sesión para ver favoritos</p>;
  }

  if (loading) {
    return <p className="text-center pt-6">Cargando favoritos...</p>;
  }

  if (favoritesMovies.length === 0) {
    return <h1 className="text-center pt-6">No results found</h1>;
  }

  return (
    <>
      {favoritesMovies.length >= 10 && <SearchBox />}
      <CardGrid
        movies={favoritesMovies.map((result) => ({
          ...result,
          id: result.movieId,
          title: result.title,
          backdrop_path: result.image,
          overview: result.description,
          vote_count: result.rating,
        }))}
      />
    </>
  );
}
