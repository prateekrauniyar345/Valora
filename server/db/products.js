// // server/db/products.js
// require("dotenv").config();
// const mongoose = require("mongoose");


// const productsConn = mongoose.createConnection(
//   process.env.MONGO_PRODUCTS_URI,
//   { useNewUrlParser: true, useUnifiedTopology: true }
// );

// productsConn.once("open", () => console.log("✅ Connected to products DB"));
// productsConn.on("error", (err) => console.error("Products DB error:", err));

// module.exports = productsConn;
