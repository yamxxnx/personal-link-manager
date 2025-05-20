import { useState } from "react";
import clientPromise from "../lib/mongodb";
console.log("MONGODB_URI:", process.env.MONGODB_URI);

export async function getServerSideProps() {
  const client = await clientPromise;
  const db = client.db();

  const links = await db
    .collection("links")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  const formattedLinks = links.map(({ _id, title, url, tags, createdAt }) => ({
    id: _id.toString(),
    title,
    url,
    tags,
    createdAt: createdAt.toISOString(),
  }));

  return { props: { initialLinks: formattedLinks } };
}

export default function LinksPage({ initialLinks }) {
  const [links, setLinks] = useState(initialLinks);

  function getHostname(url) {
    try {
      return new URL(url).hostname;
    } catch {
      return "";
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this link?")) return;

    const res = await fetch(`/api/links/${id}`, { method: "DELETE" });

    if (res.ok) {
      setLinks((prev) => prev.filter((link) => link.id !== id));
    } else {
      alert("Failed to delete link");
    }
  }

  return (
    <div>
      <h1>Saved Links</h1>
      <ul>
        {links.map(({ id, title, url, tags, createdAt }) => (
          <li key={id} style={{ marginBottom: 10 }}>
            <a href={url} target="_blank" rel="noopener noreferrer">
              {title}
            </a>{" "}
            <small>({getHostname(url)})</small>
            <br />
            <small>Tags: {tags.join(", ") || "None"}</small>
            <br />
            <small>Added: {new Date(createdAt).toISOString()}</small>
            <br />
            <button onClick={() => handleDelete(id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
