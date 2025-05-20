import { useState } from "react";

export default function AddLinkPage() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, url, tags }),
    });

    if (res.ok) {
      alert("Link saved!");
      setTitle("");
      setUrl("");
      setTags("");
    } else {
      const data = await res.json();
      alert(`Error: ${data.error}`);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Add a New Link</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Title:</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            minLength={3}
            style={styles.input}
            placeholder="Enter link title"
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>URL:</label>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            type="url"
            style={styles.input}
            placeholder="https://example.com"
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Tags (comma-separated):</label>
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            style={styles.input}
            placeholder="tag1, tag2, tag3"
          />
        </div>
        <button type="submit" style={styles.button}>
          Save Link
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 600,
    margin: "40px auto",
    padding: "0 20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: 30,
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: 6,
    fontWeight: "600",
    color: "#444",
  },
  input: {
    padding: "10px 12px",
    borderRadius: 5,
    border: "1px solid #ccc",
    fontSize: 16,
    outline: "none",
    transition: "border-color 0.2s ease",
  },
  button: {
    backgroundColor: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    padding: "12px 0",
    fontSize: 18,
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};
