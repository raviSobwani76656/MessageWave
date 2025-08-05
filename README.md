MessageWave

MessageWave is a real-time chat application built with a modern tech stack, allowing users to communicate seamlessly through text messages, share images, and manage their profiles. The application features a clean, responsive UI with a blue and white theme, powered by React, Node.js, WebSockets, and MySQL.

Features





Real-Time Messaging: Send and receive messages instantly using WebSockets.



User Profiles: Customize user avatars and display names.



Image Uploads: Share images in chats, powered by Cloudinary.



Settings Management: Adjust user preferences and app settings.



Responsive Design: Optimized for both desktop and mobile devices.



Secure Database: Stores user data and messages using MySQL with Sequelize ORM.



Modern UI: Styled with Tailwind CSS and DaisyUI for a sleek, blue-and-white-themed interface.

Tech Stack





Frontend:





React (with JSX)



Tailwind CSS & DaisyUI for styling



WebSocket client for real-time communication



Backend:





Node.js with Express



WebSocket server for real-time messaging



MySQL with Sequelize ORM for data persistence



Cloudinary for image storage and management



Other Tools:





Vite for frontend build tooling



ESLint for code linting



Git for version control

Prerequisites

Before setting up the project, ensure you have the following installed:





Node.js (v16 or higher)



MySQL (v8 or higher)



Git



A Cloudinary account for image uploads

Installation





Clone the Repository:

git clone https://github.com/your-username/messagewave.git
cd messagewave



Install Dependencies:





For the backend:

cd backend
npm install



For the frontend:

cd frontend
npm install



Set Up Environment Variables:





Create a .env file in the backend directory with the following:

DATABASE_URL=mysql://user:password@localhost:3306/messagewave
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=5000



Create a .env file in the frontend directory with:

VITE_API_URL=http://localhost:5000
VITE_WEBSOCKET_URL=ws://localhost:5000



Set Up the Database:





Ensure MySQL is running.



Create a database named messagewave:

CREATE DATABASE messagewave;



Run migrations to set up tables:

cd backend
npx sequelize-cli db:migrate



Start the Application:



Start the backend server:

cd backend
npm start



Start the frontend development server:

cd frontend
npm run dev



Access the Application:





Open your browser and navigate to http://localhost:5173 (or the port shown by Vite).

Usage



Sign Up / Log In: Create an account or log in to start chatting.

Send Messages: Use the MessageInput component to type and send messages or upload images.


Customize Profile: Update your avatar and display name in the Profile section.

Real-Time Chats: Messages appear instantly in the chat window, with MessageSkeleton placeholders for loading states.
