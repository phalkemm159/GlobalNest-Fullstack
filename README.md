GlobalNest - A Fullstack Airbnb Clone ✈️

Welcome to GlobalNest — a fullstack web application inspired by Airbnb, where users can browse, create, and book listings across the globe!

Live Demo 🚀

Click here to view GlobalNest hosted!

(Replace with your actual deployed link)


---

Features ✨

🔐 User authentication (Register/Login/Logout)

🏡 Create, edit, and delete property listings

🖼️ Upload and manage property images

🗺️ Location maps integration with Mapbox

🔎 Search and filter listings

🔒 Secure session handling

📱 Responsive design for all device sizes



---

Tech Stack 🛠️


---

Installation Guide ⚙️

Follow the steps below to set up the project locally:

1. Clone the repository

git clone https://github.com/phalkemm159/GlobalNest-Fullstack.git
cd GlobalNest-Fullstack

2. Install dependencies

npm install

3. Environment Variables

Create a .env file in the root directory and add the following:

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_api_secret

MAPBOX_TOKEN=your_mapbox_access_token

DB_URL=your_mongodb_connection_string

SECRET=your_session_secret

(Replace your_* with your actual credentials.)

> ℹ️ You will need accounts on Cloudinary, Mapbox, and MongoDB Atlas.



4. Seed the database (optional)

node seeds/index.js

This will use data.js to create multiple sample listings.

5. Run the app

npm start

The app should now be running at:

http://localhost:3000


---

Folder Structure 🗂️

GlobalNest-Fullstack/
│
├── models/         # Mongoose models
├── public/         # Static files (CSS, JS, images)
├── routes/         # Express route files
├── seeds/          # Seed scripts for database
├── utils/          # Utility functions (middleware, cloudinary, etc.)
├── views/          # EJS templates
├── app.js          # Main Express app setup
└── package.json    # Project metadata and dependencies


---

Contributing 🤝

Contributions are welcome! Feel free to fork the repo and submit a pull request.


---

License 📝

This project is licensed under the MIT License.


---

Acknowledgements ❤️

The Web Developer Bootcamp 2024 by Colt Steele

Bootstrap

Cloudinary

Mapbox



---
