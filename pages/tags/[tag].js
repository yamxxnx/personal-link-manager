import clientPromise from "../../lib/mongodb";

export async function getServerSideProps({ params }) {
  const { tag } = params;

  const client = await clientPromise;
  const db = client.db();

  const links = await db
    .collection("links")
    .find({ tags: tag })
    .sort({ createdAt: -1 })
    .toArray();

  const formattedLinks = links.map(({ _id, title, url, tags, createdAt }) => ({
    id: _id.toString(),
    title,
    url,
    tags,
    createdAt: createdAt.toISOString(),
  }));

  return { props: { tag, links: formattedLinks } };
}

export default function TagPage({ tag, links }) {
  function getHostname(url) {
    try {
      return new URL(url).hostname;
    } catch {
      return "";
    }
  }

  return (
    <div>
      <h1>Links tagged with "{tag}"</h1>
      {links.length === 0 ? (
        <p>No links found with this tag.</p>
      ) : (
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
