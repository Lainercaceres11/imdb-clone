"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";

export function useVerifyFavorites() {
  const { userId } = useAuth();
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const verifyFavorite = async () => {
      try {
        const res = await fetch(`/api/verify-favorite?userId=${userId}`);
        const data = await res.json();

        if (data.success) {
          setIsFav(data.isFav);
        }
      } catch (err) {
        console.error("Error en status favorite movie fetch:", err);
      }
    };

    verifyFavorite();
  }, [userId]);

  return { isFav };
}
