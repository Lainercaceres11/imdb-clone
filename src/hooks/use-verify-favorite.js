"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";

export function useVerifyFavorites(movieId) {
  const { userId } = useAuth();
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    if (!userId || !movieId) return;

    const verifyFavorite = async () => {
      try {
        const res = await fetch(
          `/api/check-favorite?userId=${userId}&movieId=${movieId}`
        );
        const data = await res.json();

        if (data.success) {
          setIsFav(data.isFav);
        }
      } catch (err) {
        console.error("Error en status favorite movie fetch:", err);
      }
    };

    verifyFavorite();
  }, [userId, movieId]);

  return { isFav };
}
