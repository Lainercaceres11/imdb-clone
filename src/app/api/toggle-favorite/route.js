import { NextResponse } from "next/server";
import { connect } from "../../../lib/mongodb/mongoose";
import User from "../../../lib/mongodb/models/user-model";

export async function POST(req) {
  try {
    await connect();

    const { movie, userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "No hay usuario autenticado" },
        { status: 400 }
      );
    }

    const dbUser = await User.findOne({ clerkId: userId });
    if (!dbUser) {
      return NextResponse.json(
        { success: false, error: "Usuario no encontrado en Mongo" },
        { status: 404 }
      );
    }

    // Verifica si ya está en favoritos
    const alreadyFav = dbUser.favs.some((fav) => fav.movieId === movie.movieId);

    if (alreadyFav) {
      dbUser.favs = dbUser.favs.filter((fav) => fav.movieId !== movie.movieId);
    } else {
      dbUser.favs.push(movie);
    }

    await dbUser.save();

    return NextResponse.json({
      success: true,
      favs: dbUser.favs,
      alreadyFav,
    });
  } catch (err) {
    console.error("Error toggleFavorite:", err);
    return NextResponse.json(
      { success: false, error: "No se pudo actualizar favoritos" },
      { status: 500 }
    );
  }
}
