import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { title, url, tags } = req.body;

  if (!title || title.length < 3) {
    return res
      .status(400)
      .json({ error: "Title must be at least 3 characters" });
  }

  try {
    new URL(url);
  } catch {
    return res.status(400).json({ error: "Invalid URL" });
  }

  const tagsArray = tags
    ? tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    : [];

  try {
    const client = await clientPromise;
    const db = client.db();

    await db.collection("links").insertOne({
      title,
      url,
      tags: tagsArray,
      createdAt: new Date(),
    });

    res.status(201).json({ message: "Link saved" });
  } catch {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
