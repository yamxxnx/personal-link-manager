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
    <div style={styles.container}>
      <h1 style={styles.heading}>Saved Links</h1>
      <ul style={styles.list}>
        {links.map(({ id, title, url, tags, createdAt }) => (
          <li key={id} style={styles.listItem}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
            >
              {title}
            </a>{" "}
            <small style={styles.hostname}>({getHostname(url)})</small>
            <br />
            <small style={styles.tags}>
              Tags: {tags.length ? tags.join(", ") : "None"}
            </small>
            <br />
            <small>Added: {new Date(createdAt).toISOString()}</small>
            <br />
            <button
              onClick={() => handleDelete(id)}
              style={styles.deleteButton}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 700,
    margin: "40px auto",
    padding: "0 20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: 30,
    color: "#333",
  },
  list: {
    listStyleType: "none",
    padding: 0,
  },
  listItem: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  link: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0070f3",
    textDecoration: "none",
  },
  hostname: {
    color: "#666",
    fontSize: 14,
  },
  tags: {
    fontSize: 14,
    color: "#555",
  },
  date: {
    fontSize: 12,
    color: "#999",
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: "#e00",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    padding: "6px 12px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};
