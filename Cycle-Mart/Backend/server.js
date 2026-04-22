import express from "express";
import cors from "cors";
import path from "path";
import { MongoClient, ObjectId } from "mongodb";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use("/img", express.static(path.join(process.cwd(), "img")));

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);
const dbName = "CYCLE";

await client.connect();
console.log("Connected to MongoDB");

const db = client.db(dbName);
const productsCollection = db.collection("products");
const ordersCollection = db.collection("orders");
const purchaseOrders = db.collection("PurchaseOrders");

// ✅ Get all products (latest first)
app.get("/api/products", async (req, res) => {
  try {
    const products = await productsCollection
      .find({})
      .sort({ created_at: -1 }) // 🔹 newest first
      .toArray();

    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Server error while fetching products" });
  }
});

// ✅ Add new product
app.post("/api/products", async (req, res) => {
  try {
    const { name, brand, price, imageUrl } = req.body;

    if (!name || !brand || !price || !imageUrl) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    const newProduct = {
      name,
      brand,
      price: Number(price),
      imageUrl,
      created_at: new Date(),
    };

    await productsCollection.insertOne(newProduct);

    res.status(201).json({ success: true, message: "Product added successfully" });
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Store order
app.post("/api/orders", async (req, res) => {
  const { items, totalPrice, customerName, customerEmail } = req.body;

  const result = await ordersCollection.insertOne({
    items,
    totalPrice,
    customerName,
    customerEmail,
    orderDate: new Date(),
  });

  res.json({ success: true, message: "Order placed successfully!", data: result });
});

// ✅ Fix: Return detailed products with quantity field
app.post("/api/products/details", async (req, res) => {
  const { items } = req.body; // [{ _id: "...", quantity: 2 }, ...]

  try {
    const productIds = items.map((i) => new ObjectId(i._id));

    const products = await productsCollection
      .find({ _id: { $in: productIds } })
      .toArray();

    const detailedProducts = products.map((prod) => {
      const cartItem = items.find((i) => i._id === prod._id.toString());
      return {
        _id: prod._id.toString(),
        product_name: prod.product_name,
        price: prod.price,
        imageUrl: prod.imageUrl,
        quantity: cartItem.quantity,
      };
    });

    res.json({ success: true, products: detailedProducts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});



// ✅ Login API (send user details also)
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const usersCollection = db.collection("user");

  //console.log("Login Request Data:", req.body);

  try {
    const user = await usersCollection.findOne({ email, password });

   // console.log("User Found:", user);

    if (user) {
      // ✅ Return both success + user info
      return res.json({
        success: true,
        message: "Login successful!",
        user: {
          name: user.name,
          email: user.email,
        },
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (err) {
    console.error("Login API Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});



app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);

app.post("/api/signup", async (req, res) => {
  const { name, email, phone, password } = req.body;
  const usersCollection = db.collection("user");  // Local collection

  try {
    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered." });
    }

    // Insert new user
    const result = await usersCollection.insertOne({
      name,
      email,
      phone,
      password,
      createdAt: new Date()
    });

    res.json({ success: true, message: "Signup successful!", data: result });
  } catch (err) {
    console.error("Signup API Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});
// Get all users
app.get("/api/users", async (req, res) => {
  try {
    const usersCollection = db.collection("user");
    const users = await usersCollection.find().toArray();
    res.json(users);
  } catch (err) {
    console.error("Failed to fetch users:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get all bookings/orders
// Get all orders from booking collection
/* import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const client = new MongoClient("mongodb://localhost:27017");
await client.connect();
const db = client.db("cycle_mart");
 */
// ✅ GET Orders
app.get("/api/booking", async (req, res) => {
  try {
    const orders = await db.collection("orders").find().toArray();

    const updatedOrders = orders.map((order) => {
      const subtotal = order.totalPrice || 0;
      const shipping = Math.floor(Math.random() * 200) + 50;
      const total = subtotal + shipping;

      return {
        _id: order._id,
        order_id: order._id.toString().slice(-6).toUpperCase(),
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        totalPrice: subtotal,
        shipping,
        totalPriceWithShipping: total,
        status: order.status || "Pending",
        payment_status: order.payment_status || "Unpaid",
        orderDate: order.orderDate || new Date(),
      };
    });

    res.json(updatedOrders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});



// ✅ UPDATE Order Status or Payment Status
// app.put("/api/booking/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status, payment_status } = req.body;

//     await db.collection("orders").updateOne(
//       { _id: new ObjectId(id) },
//       { $set: { status, payment_status } }
//     );

//     res.json({ success: true, message: "Order updated successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to update order" });
//   }
// });

//import { ObjectId } from "mongodb";

app.put("/api/admin/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status, payment_status } = req.body;

    const updateFields = {};
    if (status) updateFields.status = status;
    if (payment_status) updateFields.payment_status = payment_status;

    await db.collection("orders").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields }
    );

    res.json({ success: true });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
});


//app.listen(4000, () => console.log("✅ Server running on port 4000"));

// Get all suppliers from supplier collection
app.get("/api/admin/suppliers", async (req, res) => {
  try {
    const suppliersCollection = db.collection("supplier"); // MongoDB supplier collection
    const suppliers = await suppliersCollection.find().toArray();
    res.json(suppliers);
  } catch (err) {
    console.error("Failed to fetch suppliers:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});
// Supplier products API
// ✅ Get all bookings (supplier sales/orders)
app.get("/api/SupProducts", async (req, res) => {
  try {
    const bookingCollection = db.collection("booking"); // booking collection
    const bookings = await bookingCollection.find().toArray();
    res.json(bookings);
    console.log("Bookings Data:", bookings);

  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});


// ----------------------- ROUTES -----------------------

// Get all products
app.get("/api/SupProducts", async (req, res) => {
  try {
    const products = await productsCollection.find().toArray();
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// Add new product
app.post("/api/products/add", async (req, res) => {
  try {
    const { name, brand, price, imageUrl } = req.body;

    // Insert into MongoDB
    const result = await productsCollection.insertOne({
      name,
      brand,
      price: parseFloat(price),
      imageUrl: imageUrl || "",
      created_at: new Date(),
    });

    // Fetch the inserted document to return full details
    const newProduct = await productsCollection.findOne({ _id: result.insertedId });

    res.json({
      success: true,
      message: "Product added successfully!",
      data: newProduct,
    });
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post("/api/products/add", async (req, res) => {
  try {
    const { name, brand, price, imageUrl, stock } = req.body;
    const result = await productsCollection.insertOne({
      name,
      brand,
      price: parseFloat(price),
      stock: stock ? parseInt(stock) : 0,
      imageUrl: imageUrl || "",
      created_at: new Date(),
    });

    res.json({ success: true, message: "Product added successfully!", data: result.insertedId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get all bookings/orders
app.get("/api/booking", async (req, res) => {
  try {
    const bookings = await bookingCollection.find().toArray();
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// Optional: Get supplier dashboard stats
app.get("/api/dashboard/stats", async (req, res) => {
  try {
    const products = await productsCollection.find().toArray();
    const bookings = await bookingCollection.find().toArray();

    const totalSales = bookings.reduce((sum, o) => sum + Number(o.subtotal || 0), 0);
    const pendingOrders = bookings.filter((o) => o.status === "Pending").length;
    const lowStockItems = products.filter((p) => p.stock <= 5).length;

    res.json({
      productsCount: products.length,
      pendingOrders,
      totalSales,
      lowStockItems,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get("/api/admin/stats", async (req, res) => {
  try {
    const db = client.db("CYCLE");

    const customersCount = await db.collection("user").countDocuments();
    const suppliersCount = await db.collection("supplier").countDocuments();
    const productsCount = await db.collection("products").countDocuments();
    const orders = await db.collection("orders").find().toArray();
     const totalPurchaseOrders = await purchaseOrders.countDocuments(); // ✅ Add this
     
     const reportsCount = await db.collection("reports").countDocuments();
     const billsCount = await db.collection("customerBills").countDocuments();

     // ✅ Count feedback documents
    const feedbackCount = await db.collection("feedback").countDocuments();

    // 🧮 Calculate Total Sales Revenue
    const totalSalesAmount = orders.reduce((sum, order) => {
      const price = order.totalPrice || 0;
      return sum + price;
    }, 0);

    const totalOrders = orders.length;

    res.json({
      customers: customersCount,
      suppliers: suppliersCount,
      products: productsCount,
      sales: totalOrders,
      purchaseOrders: totalPurchaseOrders, // ✅ Send to frontend
      feedbacks: feedbackCount, // ✅ added this
      reports: reportsCount,
      bills: billsCount,
      totalSalesAmount: totalSalesAmount,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ error: "Failed to fetch admin stats" });
  }
});


// Delete product
app.delete("/api/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await productsCollection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 1) {
            res.json({ message: "Product deleted successfully" });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Delete failed" });
    }
});

// Update product (only name for simplicity)
app.put("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, brand, price, imageUrl } = req.body;

    // ✅ Validate input
    if (!name || !brand || !price || !imageUrl) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const result = await productsCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name,
          brand,
          price: Number(price),
          imageUrl,
        },
      }
    );

    if (result.modifiedCount === 1) {
      res.json({ message: "✅ Product updated successfully!" });
    } else {
      res.status(404).json({ message: "⚠️ Product not found or no change made" });
    }
  } catch (err) {
    console.error("❌ Error updating product:", err);
    res.status(500).json({ error: "Update failed" });
  }
});


// Reports API
app.get("/api/admin/reports", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // If no dates provided, return all reports
    let query = {};
    if (startDate && endDate) {
      // Convert dd-mm-yyyy to Date objects
      const parseDate = (str) => {
        const [dd, mm, yyyy] = str.split("-");
        return new Date(`${yyyy}-${mm}-${dd}`);
      };

      const start = parseDate(startDate);
      const end = parseDate(endDate);
      end.setHours(23, 59, 59, 999); // Include full end date

      query = { createdAt: { $gte: start, $lte: end } };
    }

    const reports = await db.collection("reports").find(query).toArray();
    res.json(reports);
  } catch (err) {
    console.error("Failed to fetch reports:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// Customer Bills
app.get("/api/admin/customer-bills", async (req, res) => {
  try {
    const bills = await db.collection("customerBills").find().toArray();
    res.json(bills);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch customer bills" });
  }
});

// Add a new customer bill
app.post("/api/admin/customer-bills", async (req, res) => {
  try {
    const { billId, customerName, date, totalAmount } = req.body;

    // ✅ Validation: check all fields
    if (!billId || !customerName || !date || !totalAmount) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // ✅ Create new bill object
    const newBill = {
      billId,
      customerName,
      date: new Date(date), // convert to Date object
      totalAmount: parseFloat(totalAmount),
      createdAt: new Date(),
    };

    // ✅ Insert into MongoDB
    const result = await db.collection("customerBills").insertOne(newBill);

    // ✅ Return saved bill to frontend
    res.status(201).json({ _id: result.insertedId, ...newBill });
  } catch (err) {
    console.error("Error adding bill:", err);
    res.status(500).json({ error: "Failed to add bill" });
  }
});


// Supplier Bills
// ✅ Supplier Bills Route
app.get("/api/admin/supplier-bills", async (req, res) => {
  try {
    const bills = await db.collection("supplierBills").find().toArray();

    // totalAmount sum
    const totalSales = bills.reduce((sum, bill) => sum + (bill.totalAmount || 0), 0);

    res.json({ bills, totalSales });
  } catch (err) {
    console.error("Error fetching supplier bills:", err);
    res.status(500).json({ error: "Failed to fetch supplier bills" });
  }
});


// add new supplier bill
app.post("/api/admin/supplier-bills", async (req, res) => {
  try {
    const { billId, supplierName, date, totalAmount } = req.body;

    if (!billId || !supplierName || !date || !totalAmount) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newBill = {
      billId,
      supplierName,
      date: new Date(date),
      totalAmount: parseFloat(totalAmount),
      createdAt: new Date(),
    };

    const result = await db.collection("supplierBills").insertOne(newBill);
    res.status(201).json({ _id: result.insertedId, ...newBill });
  } catch (err) {
    console.error("Error adding supplier bill:", err);
    res.status(500).json({ error: "Failed to add supplier bill" });
  }
});


// 📊 Dashboard Summary Route
app.get("/api/admin/dashboard-stats", async (req, res) => {
  try {
    const db = client.db("CYCLE"); // ✅ your DB name

    // Fetch all data
    const orders = await db.collection("orders").find().toArray();
    const supplierBills = await db.collection("supplierBills").find().toArray();
    const customers = await db.collection("user").find().toArray();
    const products = await db.collection("products").find().toArray();

    // 🧮 Calculate totals
    const totalSales = orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);
    const totalPurchases = supplierBills.reduce((sum, bill) => sum + (bill.totalAmount || 0), 0);
    const totalProfit = totalSales - totalPurchases;
    const activeCustomers = customers.length;
    const lowStockItems = products.filter(p => (p.stock || 0) <= 5).length;

    // Send data to frontend
    res.json({
      totalSales,
      totalPurchases,
      totalProfit,
      activeCustomers,
      lowStockItems,
    });
  } catch (err) {
    console.error("Error fetching dashboard stats:", err);
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
});

// 🧾 Get all purchase orders
app.get("/api/purchaseorders", async (req, res) => {
  try {
    const data = await purchaseOrders.find().toArray();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch purchase orders" });
  }
});

// ➕ Add new purchase order
app.post("/api/purchaseorders", async (req, res) => {
  try {
    const { supplierId, productName, quantity } = req.body;

    if (!supplierId || !productName || !quantity) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const order = {
      supplierId,
      productName,
      quantity: Number(quantity),
      status: "Pending",
      date: new Date().toISOString(),
    };

    const result = await purchaseOrders.insertOne(order);
    res.status(201).json({ message: "Purchase order added", order });
  } catch (err) {
    console.error("Error adding purchase order:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Toggle or Update status (Pending ↔ Completed)
app.put("/api/purchaseorders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // 🔍 Validate ObjectId and status
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const currentOrder = await purchaseOrders.findOne({ _id: new ObjectId(id) });
    if (!currentOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    // 🌀 If no status sent, toggle automatically
    const newStatus = status
      ? status
      : currentOrder.status === "Pending"
      ? "Completed"
      : "Pending";

    const result = await purchaseOrders.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: newStatus } }
    );

    if (result.modifiedCount === 0) {
      return res.status(400).json({ error: "No changes made" });
    }

    res.json({ success: true, message: `Status updated to ${newStatus}` });
  } catch (err) {
    console.error("Error updating order status:", err);
    res.status(500).json({ error: "Failed to update order" });
  }
});

// ❌ Delete purchase order
app.delete("/api/purchaseorders/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const result = await purchaseOrders.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({ success: true, message: "Order deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete order" });
  }
});


// ✅ Default route
app.get("/", (req, res) => {
  res.send("🚴‍♂️ CycleMart Purchase Orders Backend Running!");
});

// 🧾 Get all sales orders
app.get("/api/salesorders", async (req, res) => {
  try {
    const salesOrders = await db.collection("PurchaseOrders").find().toArray(); // 👈 collection name
    res.json(salesOrders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch sales orders" });
  }
});

// ✅ Update Payment Status of a Purchase Order
// ✅ Update Payment Status of a Purchase Order
app.put("/api/purchaseorders/:id/payment", async (req, res) => {
  const { id } = req.params;
  const { payment } = req.body;

  try {
    const result = await client
      .db("CYCLE")
      .collection("PurchaseOrders") // ✅ Corrected name
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { payment: payment } }
      );

    if (result.modifiedCount === 1) {
      res.json({ success: true, message: "Payment status updated successfully" });
    } else {
      res.status(404).json({ success: false, message: "Purchase order not found" });
    }
  } catch (error) {
    console.error("Error updating payment:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Update Subtotal of a Purchase Order
app.put("/api/purchaseorders/:id/subtotal", async (req, res) => {
  try {
    const { id } = req.params;
    const { subtotal } = req.body;

    const db = client.db("CYCLE");
    const collection = db.collection("PurchaseOrders");

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { subtotal } }
    );

    res.json({ success: true, result });
  } catch (err) {
    console.error("Error updating subtotal:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 💬 Feedback API
app.post("/api/feedback", async (req, res) => {
  try {
    const db = client.db("CYCLE");
    const collection = db.collection("feedback");

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.json({ success: false, message: "All fields are required." });
    }

    const newFeedback = {
      name,
      email,
      message,
      date: new Date(),
    };

    await collection.insertOne(newFeedback);
    res.json({ success: true, message: "Feedback saved successfully." });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: "Error saving feedback." });
  }
});

// 💬 Get All Feedbacks
app.get("/api/feedbacks", async (req, res) => {
  try {
    const db = client.db("CYCLE");
    const collection = db.collection("feedback");

    const feedbacks = await collection.find().sort({ date: -1 }).toArray(); // latest first
    res.json(feedbacks);
  } catch (err) {
    console.error("Error fetching feedbacks:", err);
    res.status(500).json({ success: false, message: "Error fetching feedbacks" });
  }
});

