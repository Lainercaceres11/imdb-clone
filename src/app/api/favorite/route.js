import { NextResponse } from "next/server";
import { connect } from "../../../lib/mongodb/mongoose";
import User from "../../../lib/mongodb/models/user-model";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const movieId = searchParams.get("movieId");

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Falta userId" },
        { status: 400 }
      );
    }

    await connect();
    const dbUser = await User.findOne({ clerkId: userId }).select("favs");

    if (!dbUser) {
      return NextResponse.json(
        { success: false, error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    if (movieId) {
      const isFav = dbUser.favs.some((fav) => fav.movieId === movieId);
      return NextResponse.json({ success: true, isFav });
    }

    return NextResponse.json({ success: true, favs: dbUser.favs });
  } catch (error) {
    console.error("Error favMovie:", error);
    return NextResponse.json(
      { success: false, error: "No se pudo obtener favoritos" },
      { status: 500 }
    );
  }
}
