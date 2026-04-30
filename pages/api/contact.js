import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      !message ||
      message.trim() == "" ||
      name.trim() == ""
    ) {
      res.status(422).json({ message: "invalid inputs." });
      return;
    }
    const newMassage = {
      name,
      email,
      message,
    };
    let client;
    try {
      client = await MongoClient.connect(
        "mongodb+srv://alanaswehahmed0_db_user:CuntpOQTOwZTqI5Q@cluster0.yvlccm7.mongodb.net/my-site",
      );
    } catch (error) {
      res.status(500).json({ message: "could not connect to database" });
      return;
    }

    const db = client.db();

    try {
      const result = await db.collection("messages").insertOne(newMassage);
      newMassage.id = result.insertedId;
    } catch (error) {
      client.close();
      res.status(500).json({ message: "storing message failed!" });
      return;
    }

    client.close();
    res
      .status(201)
      .json({ message: "successfully stores message!", data: newMassage });
  }
}
