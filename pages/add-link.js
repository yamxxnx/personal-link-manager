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
    <div>
      <h1>Add a New Link</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title: </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            minLength={3}
          />
        </div>
        <div>
          <label>URL: </label>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            type="url"
          />
        </div>
        <div>
          <label>Tags (comma-separated): </label>
          <input value={tags} onChange={(e) => setTags(e.target.value)} />
        </div>
        <button type="submit">Save Link</button>
      </form>
    </div>
  );
}
