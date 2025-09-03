import mongoose from "mongoose";

let initialized = false;
export const connect = async () => {
  mongoose.set("strictQuery", true);
  if (initialized) {
    console.log("MongoBB alredy connect");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "imdb-next-clerk",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    initialized = true;
    console.log("Moongose connected");
  } catch (error) {
    console.log("Mongo connection error", error);
  }
};
