import { NextResponse } from "next/server";
import { API_KEY, MOVIE_URL } from "../../../../services/const";

export async function GET(req, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Falta el id de la película" },
        { status: 400 }
      );
    }

    const response = await fetch(`${MOVIE_URL}/${id}?api_key=${API_KEY}`);

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: "Error al obtener película" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({ success: true, movie: data });
  } catch (error) {
    console.error("Error en API movie:", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
