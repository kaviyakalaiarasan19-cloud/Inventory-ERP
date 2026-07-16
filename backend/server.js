const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Dummy Login
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "admin123") {
        res.json({
            success: true,
            message: "Login Successful"
        });
    } else {
        res.json({
            success: false,
            message: "Invalid Username or Password"
        });
    }
});

// Dashboard Data
app.get("/dashboard", (req, res) => {
    res.json({
        totalProducts: 150,
        totalSuppliers: 25,
        totalStock: 850,
        lowStock: 8
    });
});

// Products
app.get("/products", (req, res) => {
    res.json([
        {
            id: 1,
            name: "Dell Laptop",
            category: "Laptop",
            price: 55000,
            stock: 15
        },
        {
            id: 2,
            name: "HP Laptop",
            category: "Laptop",
            price: 60000,
            stock: 8
        },
        {
            id: 3,
            name: "Wireless Mouse",
            category: "Accessories",
            price: 1200,
            stock: 35
        }
    ]);
});

// Suppliers
app.get("/suppliers", (req, res) => {
    res.json([
        {
            id: 1,
            name: "Dell India",
            phone: "9876543210"
        },
        {
            id: 2,
            name: "HP India",
            phone: "9123456789"
        }
    ]);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});