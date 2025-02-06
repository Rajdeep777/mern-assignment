```
# Roxiler Systems MERN Stack Coding Challenge

This project is built as part of the Roxiler Systems MERN Stack Coding Challenge. It is a full-stack application that displays product transaction data from a third-party API in a dashboard. The dashboard features a transactions table with search and pagination, statistics on sales data, and charts (bar and pie) to visualize price ranges and category distributions.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Notes](#notes)
- [License](#license)

## Features
- **Database Seeding:** Fetches data from a third-party API and seeds the MongoDB database.
- **Transactions Listing:** Lists transactions filtered by month with support for search and pagination.
- **Sales Statistics:** Displays the total sale amount, total sold items, and total not sold items.
- **Charts:** 
  - **Bar Chart:** Shows the distribution of products based on predefined price ranges.
  - **Pie Chart:** Visualizes the count of transactions per unique category.
- **Combined API:** Aggregates data from multiple endpoints into a single API call.
- **Responsive UI:** A clean and modern interface styled to match provided mockups.

## Tech Stack
- **Backend:** Node.js, Express, MongoDB, Mongoose, Axios
- **Frontend:** React, Chart.js (via react-chartjs-2), Axios
- **Styling:** Custom CSS

## Project Structure

```
/backend
├── models
│   └── Transaction.js
├── routes
│   ├── seed.js
│   ├── transactions.js
│   ├── statistics.js
│   ├── charts.js
│   └── combined.js
├── index.js
└── package.json

/frontend
├── public
├── src
│   ├── components
│   │   ├── TransactionsTable.js
│   │   ├── Statistics.js
│   │   ├── BarChartComponent.js
│   │   └── PieChartComponent.js
│   ├── App.js
│   ├── App.css
│   └── index.js
└── package.json
```

## Setup and Installation

### Prerequisites
- [Node.js](https://nodejs.org/en/) and npm installed.
- [MongoDB](https://www.mongodb.com/) installed and running (default connection used is `mongodb://localhost:27017/roxiler_db`).

### Backend Setup
1. **Navigate to the backend folder:**
   ```bash
   cd backend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure Database Connection:**  
   Ensure the MongoDB URI in `index.js` is correct:
   ```js
   const MONGO_URI = 'mongodb://localhost:27017/roxiler_db';
   ```
4. **Start the Backend Server:**
   ```bash
   npm run dev
   ```
5. **Seed the Database:**  
   Visit the following URL in your browser or use a tool like Postman to seed the database:
   ```
   http://localhost:5000/api/seed
   ```

### Frontend Setup
1. **Navigate to the frontend folder:**
   ```bash
   cd frontend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the Frontend Application:**
   ```bash
   npm start
   ```
4. **Access the Dashboard:**  
   Open your browser and navigate to `http://localhost:3000` to view the dashboard.

## API Endpoints

- **Seed Database:**  
  `GET /api/seed`  
  Fetches data from the third-party API and seeds the database.

- **List Transactions:**  
  `GET /api/transactions?month=<Month>&search=<Text>&page=<Page>&perPage=<PerPage>`  
  Returns transactions filtered by month, with search and pagination support.

- **Statistics:**  
  `GET /api/stats?month=<Month>`  
  Returns sales statistics (total sale amount, total sold items, total not sold items).

- **Bar Chart Data:**  
  `GET /api/charts/bar?month=<Month>`  
  Returns data for a bar chart showing the distribution of products across price ranges.

- **Pie Chart Data:**  
  `GET /api/charts/pie?month=<Month>`  
  Returns data for a pie chart showing the distribution of products by category.

- **Combined Data:**  
  `GET /api/combined?month=<Month>&search=<Text>&page=<Page>&perPage=<PerPage>`  
  Aggregates responses from transactions, statistics, bar chart, and pie chart endpoints.

## Usage
1. **Select Month:**  
   Use the dropdown in the header to select a month (default is March).

2. **Search Transactions:**  
   Type into the search box to filter transactions by title, description, or price.

3. **Pagination:**  
   Use the "Previous" and "Next" buttons to navigate through pages of transactions.

4. **View Statistics and Charts:**  
   The statistics section displays total sale amount, sold items, and unsold items, while the charts dynamically update based on the selected month and search criteria.

## Notes
- **Environment Variables:**  
  For production, consider using environment variables to manage configuration (such as MongoDB URI and API base URLs).

- **Error Handling:**  
  The code includes basic error handling; you may wish to expand this for production-level applications.
