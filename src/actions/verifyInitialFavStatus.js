"use server";

import User from "../lib/mongodb/models/user-model";
import { connect } from "../lib/mongodb/mongoose";

export async function getInitialFavoriteStatus(movieId, userId) {
  try {
    await connect();
    const dbUser = await User.findById({ clerkId: userId });
    return dbUser?.favs?.some((fav) => fav.movieId === movieId) || false;
  } catch (error) {
    console.error("Error getting initial favorite status:", error);
    return false;
  }
}
