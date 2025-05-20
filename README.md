📚 Personal Link Manager
A simple web app built with Next.js and MongoDB to manage and store your favorite links, tag them, and view/delete them easily.

🚀 Features
📝 Add New Link — Submit a title, URL, and optional tags.

📋 View All Links — See all saved links sorted by newest first.

🏷️ Tags — Tag links with keywords (e.g., work, read, tech).

❌ Delete Link — Remove a saved link anytime.

🔍 Filter by Tag (Optional route) — View links filtered by tag.

🌐 MongoDB as the database using official Node.js driver.

💡 Server-Side Rendering (SSR) with getServerSideProps.

🧠 How It Works
📁 Folder Structure
/pages
  ├── /api/links/index.js        # POST API to add a new link
  ├── /api/links/[id].js         # DELETE API to remove a link
  ├── add-links.js               # UI to submit a new link
  ├── links.js                   # UI to list and delete links
  └── tags/[tag].js              # Optional: filter view by tag

/lib
  └── mongodb.js                 # MongoDB connection setup

.env.local                       # Stores MongoDB URI (not pushed)
🧩 Tech Stack
Framework: Next.js

Database: MongoDB Atlas

Language: JavaScript (React)

Deployment: Ready for Vercel or custom deployment

⚙️ Setup Instructions
1. Clone the Repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
2. Install Dependencies
npm install
3. Configure Environment Variables
Create a file named .env.local in the root:
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
Replace with your actual MongoDB Atlas connection string.

4. Run the App Locally
npm run dev
Visit: http://localhost:3000/links

📄 Routes & API
Frontend Pages
Path	Description
/links	View all saved links
/add-links	Add a new link
/tags/[tag]	View links filtered by tag

API Routes
Method	Endpoint	Purpose
POST	/api/links	Add a new link
DELETE	/api/links/[id]	Delete a saved link

🔍 Example Usage
Title: Google

URL: https://www.google.com

Tags: search,tools

These values will be saved in MongoDB like:
{
  "title": "Google",
  "url": "https://www.google.com",
  "tags": ["search", "tools"],
  "createdAt": "2025-05-20T11:50:00Z"
}
🛡️ Security Note
Do not commit your .env.local.

Make sure your .gitignore includes .env.local, node_modules, and .next.

🌍 Deployment (Optional)
You can deploy to Vercel in seconds:

npx vercel
Add MONGODB_URI in the Vercel dashboard under Project > Settings > Environment Variables.

🙌 Credits
Built by Mohammad Yamaan Ansari

