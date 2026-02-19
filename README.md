# React Dashboard

A modern, clean, and professional React Dashboard application built for a fictional e-commerce company.

## Features

- **Dashboard**: KPI cards, interactive charts (Revenue, Orders, Sales), and filters (Date, Region, Category).
- **Orders**: searchable, filterable, and paginated table of orders.
- **Customers**: Customer list with aggregated stats (Total Spend, Orders).
- **Products**: Product performance tracking with category filtering and revenue calculation.
- **Responsive Design**: Fully responsive layout for all screen sizes.

## tech Stack

- **React** (Vite)
- **React Router DOM** (Routing)
- **Recharts** (Data Visualization)
- **Lucide React** (Icons)
- **CSS Modules / Vanilla CSS** (Styling)

## Setup Instructions

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Build for production:
    ```bash
    npm run build
    ```

## Project Structure

```
src/
├── components/
│   ├── Common/       # Reusable components (Table, Card)
│   ├── Dashboard/    # Dashboard-specific components (KPIs, Charts)
│   └── Layout/       # Layout components (Sidebar, Topbar)
├── data/             # Mock data generation logic
├── hooks/            # Custom hooks (useDashboardData)
├── pages/            # Page components (Dashboard, Orders, Customers, Products)
├── styles/           # Global and component-specific styles
├── App.jsx           # Main application component with routing
└── main.jsx          # Entry point
```

## Architecture Decisions

- **State Management**: Used React `useState` and `useMemo` for local state and derived data (filtering/aggregation). No external request library was needed for mock data.
- **Component Design**: Focused on reusability (e.g., `Table` component) and separation of concerns (Logic in Hooks, UI in Components).
- **Styling**: Used standard CSS with CSS variables for consistency and easy theming. Avoided heavy CSS frameworks to keep the bundle small and demonstrate core CSS skills.
- **Mock Data**: Created a robust mock data generator in separate folder to simulate a real API response structure.

## Future Improvements

- Add a real backend (Node.js/Express).
- Implement user authentication.
- Add "Add/Edit" functionality for Orders and Products.
- Add dark mode support.
