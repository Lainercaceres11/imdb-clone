"use server";

import User from "../lib/mongodb/models/user-model";

import { connect } from "../lib/mongodb/mongoose";

export async function toggleFavorite(movie, userId) {
  try {
    await connect();
    if (!userId) throw new Error("No hay usuario autenticado");

    const dbUser = await User.findOne({ clerkId: userId });
    if (!dbUser) throw new Error("Usuario no encontrado en Mongo");

    // Verifica si ya está en favoritos
    const alreadyFav = dbUser.favs.some((fav) => fav.movieId === movie.movieId);

    if (alreadyFav) {
      dbUser.favs = dbUser.favs.filter((fav) => fav.movieId !== movie.movieId);
    } else {
      dbUser.favs.push(movie);
    }

    await dbUser.save();
    return { success: true, favs: dbUser.favs, alreadyFav };
  } catch (err) {
    console.error("Error toggleFavorite:", err);
    return { success: false, error: "No se pudo actualizar favoritos" };
  }
}
