import User from "../../../lib/mongodb/models/user-model";
import { connect } from "../../../lib/mongodb/mongoose";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connect();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const movieId = searchParams.get("movieId");

    if (!userId || !movieId) {
      return NextResponse.json(
        { success: false, error: "Faltan parámetros" },
        { status: 400 }
      );
    }

    const dbUser = await User.findOne({ clerkId: userId });

    if (!dbUser) {
      return NextResponse.json(
        { success: false, error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    const isFav = dbUser?.favs?.some((fav) => fav.movieId === movieId) || false;

    return NextResponse.json({ success: true, isFav });
  } catch (error) {
    console.error("Error en check-favorite API:", error);
    return NextResponse.json(
      { success: false, error: "Error en el servidor" },
      { status: 500 }
    );
  }
}
