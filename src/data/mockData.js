export const generateMockData = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // 1. Revenue Data (Line Chart)
  const revenueData = months.map((month) => ({
    name: month,
    revenue: Math.floor(Math.random() * 50000) + 10000,
  }));

  // 2. Orders by Category (Bar Chart)
  const categories = ["Electronics", "Fashion", "Home", "Beauty", "Sports"];
  const ordersByCategory = categories.map((cat) => ({
    name: cat,
    orders: Math.floor(Math.random() * 500) + 50,
  }));

  // 3. Sales by Region (Pie Chart)
  const regions = ["North America", "Europe", "Asia", "Other"];
  const salesByRegion = regions.map((region) => ({
    name: region,
    value: Math.floor(Math.random() * 10000) + 2000,
  }));

  // 4. Orders List
  const statuses = ["Pending", "Shipped", "Delivered", "Cancelled"];
  const orders = Array.from({ length: 50 }, (_, index) => ({
    id: `ORD-${1000 + index}`,
    customer: `Customer ${index + 1}`,
    date: `2023-${Math.floor(Math.random() * 12) + 1}-${Math.floor(Math.random() * 28) + 1}`,
    amount: (Math.random() * 500).toFixed(2),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    region: regions[Math.floor(Math.random() * regions.length)],
    category: categories[Math.floor(Math.random() * categories.length)], // Added for filtering
  })); 

  // 5. Customers List
  const customers = Array.from({ length: 20 }, (_, index) => ({
    id: `CUST-${1000 + index}`,
    name: `Customer ${index + 1}`,
    email: `customer${index + 1}@example.com`,
    totalSpend: (Math.random() * 2000).toFixed(2),
    totalOrders: Math.floor(Math.random() * 20) + 1,
  }));

  // 6. Products List
  const products = Array.from({ length: 15 }, (_, index) => ({
    id: `PROD-${1000 + index}`,
    name: `Product ${index + 1}`,
    category: categories[Math.floor(Math.random() * categories.length)],
    price: (Math.random() * 100 + 10).toFixed(2),
    unitsSold: Math.floor(Math.random() * 1000),
    revenue: 0, // Calculated later
  })).map((p) => ({
    ...p,
    revenue: (p.price * p.unitsSold).toFixed(2),
  }));

  return {
    revenueData,
    ordersByCategory,
    salesByRegion,
    orders,
    customers,
    products,
  };
};

export const MOCK_DATA = generateMockData();
