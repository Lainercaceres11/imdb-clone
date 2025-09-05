"use server";

import User from "../lib/mongodb/models/user-model";

import { connect } from "../lib/mongodb/mongoose";

export async function toggleFavorite(movie, id) {
  try {
    await connect();
    if (!id) throw new Error("No hay usuario autenticado");

    // Busca usuario en Mongo por clerkId
    const dbUser = await User.findOne({ clerkId: id });
    if (!dbUser) throw new Error("Usuario no encontrado en Mongo");

    // Verifica si ya está en favoritos
    const alreadyFav = dbUser.favs.some((fav) => fav.movieId === movie.movieId);
    console.log(alreadyFav);

    if (alreadyFav) {
      // Remover
      dbUser.favs = dbUser.favs.filter((fav) => fav.movieId !== movie.movieId);
    } else {
      // Agregar
      dbUser.favs.push(movie);
    }

    await dbUser.save();
    return { success: true, favs: dbUser.favs };
  } catch (err) {
    console.error("Error toggleFavorite:", err);
    return { success: false, error: "No se pudo actualizar favoritos" };
  }
}
