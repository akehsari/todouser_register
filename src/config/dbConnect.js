import dotenv from 'dotenv/config'
import mongoose from "mongoose";

const url = process.env.URL

export async function dbConnect() {

  try {
    await mongoose.connect(url);
    console.log('monodb Connect');
  } catch (error) {
        console.log('monodb not Connect' , error)
  }

}


