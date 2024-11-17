// Set up db connection here

// Named Import ตัว MongoClient มาจาก "mongodb"
import { MongoClient } from "mongodb";

// MongoDB จะมี Url ให้เราทำการเชื่อมต่อ
// โดยปกติแล้ว Url จะอยู่ในรูปแบบ mongodb://url:port
const connectionString = "mongodb://127.0.0.1:27017";

// 2) Options ซึ่งเราจะใส่ { useUnifiedTopology: true }

export const client = new MongoClient(connectionString, {
  useUnifiedTopology: true,
});

// กำหนดให้ DB ที่จะใช้งานคือ "practice-mongo"
export const db = client.db("practice-mongo");

// เชื่อมต่อ MongoDB และตรวจสอบว่าเชื่อมต่อได้
client
  .connect()
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });
