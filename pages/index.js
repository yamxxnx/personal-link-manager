import Link from "next/link";

export default function HomePage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to Personal Link Manager</h1>
      <div style={styles.buttonContainer}>
        <Link href="/links" legacyBehavior>
          <a style={styles.button}>View Links</a>
        </Link>
        <Link href="/add-link" legacyBehavior>
          <a style={styles.button}>Add a Link</a>
        </Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 600,
    margin: "80px auto",
    padding: "0 20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    textAlign: "center",
  },
  heading: {
    marginBottom: 50,
    color: "#333",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: 40,
  },
  button: {
    backgroundColor: "#0070f3",
    color: "white",
    padding: "18px 36px",
    borderRadius: 8,
    fontSize: 20,
    fontWeight: "bold",
    textDecoration: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};
