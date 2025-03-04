# Northcoders News

Northcoders News is a platform for social news aggregation, discussion, and content rating. This full-stack CRUD application enables users to browse, post, vote on, and comment on articles, which are categorized by topic. The front end is built using React, while the back end is powered by Node.js and Express.

## Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Installation Guide](#installation-guide)
- [API Overview](#api-overview)
- [Application Workflow](#application-workflow)
- [Deployment Information](#deployment-information)
- [Future Enhancements](#future-enhancements)

## Project Overview

This project was developed as part of the Northcoders Bootcamp to solidify full-stack development skills by building an interactive web application with a React front end and a Node.js back end.

## Key Features

- Browse and filter articles by topic.
- Sort articles based on date, votes, or comment count.
- View detailed articles along with user comments.
- Upvote/downvote articles.
- Add and delete comments (only by the logged-in user).
- Robust error handling for missing or invalid paths, articles, and topics.
- Fully responsive design across different devices.

## Tech Stack

### Front End

- React
- React Router
- Axios
- CSS (basic styling)

### Back End

- Node.js
- Express.js
- PostgreSQL
- CORS

### Deployment

- **Front End**: TBC
- **Back End**: Render, Supabase

## Installation Guide

### Prerequisites

Ensure you have the following installed:

- Node.js
- Git
- A code editor (e.g., VS Code)

### Setting Up the Front End

```sh
# Clone the front-end repository
git clone https://github.com/CodrutaRisco/nc-news.git
cd nc-news

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Setting Up the Back End

```sh
# Clone the back-end repository
git clone https://github.com/CodrutaRisco/my-nc-news.git
cd my-nc-news

# Install dependencies
npm install

# Enable CORS in `app.js`
const cors = require('cors');
app.use(cors());

# Start the server
npm run start
```

### Connecting the Front End and Back End

Ensure that API calls in the React app point to the appropriate back-end URL (e.g., `http://localhost:5000` for local development or your deployed Render URL).

## API Overview

### Articles

- `GET /api/articles` - Retrieve all articles.
- `GET /api/articles/:article_id` - Fetch a specific article.
- `PATCH /api/articles/:article_id` - Vote on an article.

### Comments

- `GET /api/articles/:article_id/comments` - Retrieve comments for an article.
- `POST /api/articles/:article_id/comments` - Submit a comment.
- `DELETE /api/comments/:comment_id` - Remove a comment.

### Topics

- `GET /api/topics` - Retrieve all topics.

## Application Workflow

1. **Viewing Articles:** Articles are displayed with essential details and can be filtered by topic.
2. **Voting Mechanism:** Users can vote on articles, and changes are reflected immediately.
3. **Commenting System:** Users can submit and delete comments.
4. **Sorting & Filtering:** Articles can be sorted by various criteria and filtered by topic.
5. **Error Handling:** Users receive clear error messages for incorrect paths, missing data, or failed actions.

## Deployment Information

### Front End

The application is deployed on [TBC]. Access the live version [TBC]().

### Back End

The API is hosted on Render. Documentation is available [here](https://github.com/CodrutaRisco/my-nc-news.git).

## Future Enhancements

- Implement authentication and user accounts.
- Enhance UI/UX with a dark mode toggle.
- Introduce pagination for articles and comments.
- Improve error messages with more detailed explanations.

---

### Feedback & Contributions

If you encounter any issues or have suggestions, feel free to open an issue or submit a pull request on GitHub!
