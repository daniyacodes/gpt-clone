# GPT Clone

A full-stack AI chat application inspired by ChatGPT, built with React, Node.js, Express, and MySQL. The project provides a conversational interface where users can send messages and receive AI-generated responses.

## Features

- Interactive chat interface inspired by ChatGPT.
- React component-based frontend.
- Express and Node.js backend API.
- MySQL database integration for storing conversations and messages.
- REST API for handling chat requests.
- Environment-based configuration for sensitive credentials.
- Responsive user interface for desktop and mobile devices.

## Tech Stack

**Frontend**
- React
- Vite
- JavaScript
- CSS Modules and CSS

**Backend**
- Node.js
- Express.js
- MySQL
- REST API

## Project Structure

```text
chatgpt-clone-deploy/
├── backend/
│   ├── db/
│   │   ├── db.config.js
│   │   └── schema.sql
│   ├── src/
│   │   ├── api/
│   │   │   ├── chat/
│   │   │   │   ├── controller/
│   │   │   │   ├── service/
│   │   │   │   └── chat.routes.js
│   │   │   └── main.routes.js
│   │   ├── middleware/
│   │   └── index.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

Make sure you have installed:

- Node.js and npm
- MySQL Server
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/daniyacodes/gpt-clone.git
cd gpt-clone
```

### 2. Configure the Backend

Navigate to the backend directory:

```bash
cd backend
npm install
```

Create a `.env` file using the environment variable template or configuration required by your backend.

Example:

```env
PORT=3778
DB_HOST=localhost
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
```

Add any AI provider API key required by your implementation. Use the exact environment variable names expected by your backend code.

### 3. Set Up the Database

Create your MySQL database and execute the SQL statements in `backend/db/schema.sql`.

For example, using the MySQL command-line client:

```bash
mysql -u your_database_user -p your_database_name < db/schema.sql
```

Run this command from the `backend` directory. Replace the database name and username with your actual configuration.

### 4. Start the Backend

From the `backend` directory, run:

```bash
npm run dev
```

Make sure the command is defined in your backend `package.json`. Otherwise, use the start command configured for your project.

### 5. Configure and Start the Frontend

Open a second terminal:

```bash
cd frontend
npm install
```

Create a frontend `.env` file based on `frontend/.env.example`. Configure the API base URL using the environment variable expected by your Vite application.

For example, if your frontend uses `VITE_API_BASE_URL`:

```env
VITE_API_BASE_URL=http://localhost:3778/api
```

Start the development server:

```bash
npm run dev
```

Open the local URL printed by Vite in your terminal.

## How It Works

1. The user enters a message through the React chat interface.
2. The frontend sends the request to the Express backend.
3. The backend processes the request and communicates with the configured AI service, if applicable.
4. The backend returns the response to the frontend.
5. The frontend displays the response in the conversation interface.
6. Conversation data can be stored in MySQL according to the application's database design.

## Environment Variables and Security

- Never commit `.env` files containing passwords, API keys, or other secrets.
- Keep `.env` files excluded through `.gitignore`.
- Provide `.env.example` files with placeholder values for required configuration.
- Configure production environment variables separately from local development.
- Never expose private AI provider API keys in frontend code.

## Future Improvements

- User authentication and individual chat histories.
- Conversation creation, renaming, and deletion.
- Streaming AI responses.
- Markdown rendering and code highlighting.
- Search across previous conversations.
- Improved accessibility and mobile responsiveness.
- Production deployment and monitoring.

## Author

**Daniya**

GitHub: [@daniyacodes](https://github.com/daniyacodes)

## License

This project is available for learning and portfolio demonstration. Add a license file if you intend to distribute it under a specific open-source license.

