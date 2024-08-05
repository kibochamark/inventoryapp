# Inventory App

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Features

### Dashboard

The dashboard provides an overview of key inventory metrics through four main cards:

1. **Stock Value Overview**: Displays the total value of all inventory items.
2. **Recently Added Items**: Shows a list of items that were recently added to the inventory.
3. **Low Item Stock**: Highlights items that are running low in stock.
4. **Available Inventories DataGrid**: Presents a comprehensive table of all available inventory items, allowing for sorting and filtering.

### Charts

The app includes charts for visualizing inventory data:

1. **Category Inventory Count**: A chart displaying the total inventory count by category. This allows users to see the distribution of stock across different categories.
2. **Stock Levels Over Time**: A line chart showing stock levels over time, which can be configured to display data by day or week. This helps users track inventory trends and fluctuations over the selected period.

### Using the Charts

- **Category Inventory Count**: Visualize the inventory count across different categories with an easy-to-read pie chart.
- **Stock Levels Over Time**: View stock levels over time in a line chart. The x-axis can display days of the week or weeks of the month, depending on the selected interval. The y-axis is adjusted to ensure clarity and prevent data compression.



