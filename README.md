MessageWave: Real-Time Chat Application
MessageWave is a modern, real-time chat application designed for seamless communication. It features text messaging, image sharing via Cloudinary, user profile customization, and a responsive blue-and-white-themed interface. Built with React, Node.js, WebSockets, and MySQL, MessageWave delivers a fast and engaging user experience across desktop and mobile devices.
Overview
MessageWave enables users to connect instantly, send messages, share images, and manage profiles and settings. The application leverages WebSockets for real-time communication, MySQL with Sequelize ORM for data storage, and Tailwind CSS with DaisyUI for a sleek, responsive design.
Features

Real-Time Messaging: Instant message delivery using WebSockets.
User Profiles: Customize avatars and display names.
Image Sharing: Upload and share images seamlessly with Cloudinary integration.
Settings Management: Adjust user preferences and app settings.
Responsive Design: Optimized for both desktop and mobile devices.
Secure Data Storage: MySQL database with Sequelize ORM for reliable data management.
Modern UI: Clean, blue-and-white-themed interface styled with Tailwind CSS and DaisyUI.

Tech Stack

Frontend:
React (JSX)
Tailwind CSS & DaisyUI
WebSocket client


Backend:
Node.js with Express
WebSocket server
MySQL with Sequelize ORM
Cloudinary for image management


Tools:
Vite (frontend build tool)
ESLint (code linting)
Git (version control)



Prerequisites
Ensure the following are installed before setting up the project:

Node.js (v16 or higher)
MySQL (v8 or higher)
Git
Cloudinary account (for image uploads)

Installation
Follow these steps to set up MessageWave locally:

Clone the Repository:
git clone https://github.com/your-username/messagewave.git
cd messagewave


Install Dependencies:

Backend:cd backend
npm install


Frontend:cd frontend
npm install




Configure Environment Variables:

In the backend directory, create a .env file:DATABASE_URL=mysql://user:password@localhost:3306/messagewave
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=5000


In the frontend directory, create a .env file:VITE_API_URL=http://localhost:5000
VITE_WEBSOCKET_URL=ws://localhost:5000




Set Up the Database:

Ensure MySQL is running.
Create the database:CREATE DATABASE messagewave;


Run migrations:cd backend
npx sequelize-cli db:migrate




Start the Application:

Backend server:cd backend
npm start


Frontend development server:cd frontend
npm run dev




Access MessageWave:

Open http://localhost:5173 (or the port displayed by Vite) in your browser.



Usage

Sign Up / Log In: Create an account or log in to start chatting.
Send Messages: Use the MessageInput component to send text or upload images.
Manage Profile: Update your avatar and display name in the Profile section.
Adjust Settings: Customize preferences in the Settings section.
Real-Time Experience: Messages load instantly, with MessageSkeleton placeholders during loading.
