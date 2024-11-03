# HTMX Article Management System

This project is an Article Management System built using HTMX, Express.js, and Pug templating engine. It demonstrates the power of HTMX for creating dynamic web applications with minimal JavaScript.

## Features

- List all articles
- View individual article details
- Add new articles with image upload
- Real-time updates without full page reloads

## Technologies Used

- HTMX
- Express.js
- Pug (templating engine)
- Multer (for file uploads)
- Node.js

## Prerequisites

- Node.js (v14 or later recommended)
- npm (comes with Node.js)

## Setup and Installation

1. Clone the htmx-article-management i.e. htmx repository:

git clone https://github.com/harryweb/htmx.git
cd htmx

2. Install dependencies:

npm install

3. Create a `public/uploads` directory in the project root:

mkdir -p public/uploads

4. Start the server with nodemon:

npm install -g nodemon

nodemon app

5. Open your browser and navigate to `http://localhost:3000`

## Project Structure

- `app.js`: Main application file
- `routes/index.js`: Route handlers
- `views/`: Pug templates
  - `layouts/`: Layout templates
  - `partials/`: Partial templates
- `public/`: Static files (CSS, client-side JS, uploaded images)
- `data/articles.js`: In-memory article storage (replace with a database in production)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).