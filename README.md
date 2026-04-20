🚍 JatraPath – Your Route Friend

A modern web-based route planning application that helps users discover transport routes, view bus details, and visualize journeys on an interactive map.

✨ Features
🔍 Search routes between source and destination
🚌 View available buses for each route
🗺️ Interactive map visualization of routes and stops
📍 Smart location suggestions
💰 Fare information display
⚡ Fast performance using lightweight data

🛠️ Tech Stack
Frontend
Next.js
React
TypeScript
Tailwind CSS

Backend
Next.js API Routes
Node.js

Data
Static JSON files (routes, stops, buses)

Map Integration
React-based map components
Route visualization using coordinates and markers

📁 Project Structure
JatraPath/
├── app/                # Pages & routing (Next.js App Router)
├── components/         # Reusable UI components
├── app/api/            # API routes (backend logic)
├── data/               # Static JSON data
├── public/             # Assets (images, icons)
├── lib/                # Utility functions


🚀 Getting Started

1. Clone the repo
cd JatraPath
2. Install dependencies
npm install
3. Run the app
npm run dev
4. Open in browser
http://localhost:3000


🔄 How It Works
User enters source and destination
Frontend sends request to API
Backend processes route data
Matching routes are returned
UI displays:
Route list
Bus details
Map visualization
🗺️ Map Visualization
Displays routes using coordinate-based paths
Marks stops using map markers
Dynamically updates when a route is selected
⚠️ Limitations
No real-time transport data
No authentication system
Uses static dataset
🚀 Future Improvements
Add database (e.g., MongoDB)
User authentication & roles
Live GPS tracking
Mobile app version
👥 Contributors
Frontend Developer-  Snigdha Rani Das– UI, components, map visualization
Backend Developer- Junaedul Fahim Dipu – API, data processing, map integration