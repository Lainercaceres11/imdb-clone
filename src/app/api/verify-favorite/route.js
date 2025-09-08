import User from "../../../lib/mongodb/models/user-model";
import { connect } from "../../../lib/mongodb/mongoose";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "No hay usuario autenticado" },
        { status: 400 }
      );
    }
    await connect();
    const dbUser = await User.findById({ clerkId: userId });

    const isFav = dbUser?.favs?.some((fav) => fav.movieId === movieId) || false;

    return NextResponse.json({
      success: true,
      isFav,
    });
  } catch (error) {
    console.error("Error favMovie:", error);
    return NextResponse.json(
      { success: false, error: "No se pudo verificar la pelicula" },
      { status: 500 }
    );
  }
}
