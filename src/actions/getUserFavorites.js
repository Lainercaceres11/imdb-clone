"use server";

import User from "../lib/mongodb/models/user-model";
import { connect } from "../lib/mongodb/mongoose";

export async function getUserFavs(userId) {
  try {
    await connect();

    const user = await User.findOne({ clerkId: userId }).select("favs");

    if (!user) {
      throw new Error("Usuario no encontrado en Mongo");
    }

    return user.favs;
  } catch (error) {
    console.error("Error obteniendo favoritos:", error);
    return [];
  }
}
