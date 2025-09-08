"use client";

import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";

export function useFavorites() {
  const { userId } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [isFav, setIsFav] = useState(false);

  const toggleFavorite = async (movie) => {
    if (!userId) return { success: false, error: "Usuario no autenticado" };

    try {
      const res = await fetch("/api/toggle-favorite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ movie, userId }),
      });

      const data = await res.json();

      if (data.success) {
        setFavorites(data.favs);
        setIsFav(true);
      }

      return data;
    } catch (err) {
      console.error("Error en toggleFavorite fetch:", err);
      return { success: false, error: "Error de red" };
    }
  };

  return { isFav, favorites, toggleFavorite };
}
