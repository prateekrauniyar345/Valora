// // server/routes/products.js
// const express = require("express");
// const router = express.Router();
// const Product = require("../models/Product");
// const Discount = require("../models/Discount"); 

// // ─── GET /api/products ─────────────────────────────────────
// router.get("/", async (req, res) => {
//   try {
//     const { gender, category, search, limit = 40 } = req.query;
//     const filter = {};
//     const orConditions = [];

//     // Skip gender filter if it's "all"
//     if (gender && gender.toLowerCase() !== "all") {
//       filter.gender = new RegExp(`^${gender}$`, "i");
//     }

//     // Add category conditions
//     if (category && category !== "all") {
//       const regex = new RegExp(category.replace(/-/g, " "), "i");
//       orConditions.push({ subCategory: regex });
//       orConditions.push({ articleType: regex });
//     }

//     // Add search text conditions
//     if (search) {
//       const rx = new RegExp(search, "i");
//       orConditions.push({ productDisplayName: rx });
//       orConditions.push({ articleType: rx });
//       orConditions.push({ subCategory: rx });
//       orConditions.push({ masterCategory: rx });
//     }

//     if (orConditions.length) {
//       filter.$or = orConditions;
//     }

//     const items = await Product.find(filter).limit(parseInt(limit));
//     res.json(items);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to fetch products" });
//   }
// });


// /**
//  * GET /api/products/:id
//  * Path param:
//  *   - id = MongoDB ObjectId of the product
//  */
// router.get("/:id", async (req, res) => {
//   try {
//     const item = await Product.findById(req.params.id);
//     // console.log(item);
//     if (!item) {
//       return res.status(404).json({ error: "Product not found" });
//     }
//     res.json(item);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to fetch product" });
//   }
// });

// module.exports = router;




// server/routes/products.js
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Discount = require("../models/Discount");

router.get("/", async (req, res) => {
  try {
    const { gender, category, search, discount, limit = 40 } = req.query;

    // ────────────────────────────────────────────────
    // 🔥 1. Handle Discounted Products (Separate Collection)
    if (discount) {
      // Fetch products from the discounts collection instead of the main Product collection
      const discountFilter = { discountCode: discount };

      // Optional: Apply gender/category/search filters on top of discount filter
      if (gender && gender.toLowerCase() !== "all") {
        discountFilter.gender = new RegExp(`^${gender}$`, "i");
      }

      if (category && category !== "all") {
        const regex = new RegExp(category.replace(/-/g, " "), "i");
        discountFilter.$or = [
          { subCategory: regex },
          { articleType: regex }
        ];
      }

      if (search) {
        const rx = new RegExp(search, "i");
        discountFilter.$or = [
          { productDisplayName: rx },
          { articleType: rx },
          { subCategory: rx },
          { masterCategory: rx }
        ];
      }

      const discountedItems = await Discount.find(discountFilter).limit(parseInt(limit));
      return res.json(discountedItems);
    }

    // ────────────────────────────────────────────────
    // 2. Normal (non-discounted) Product Search
    const filter = {};
    const orConditions = [];

    if (gender && gender.toLowerCase() !== "all") {
      filter.gender = new RegExp(`^${gender}$`, "i");
    }

    if (category && category !== "all") {
      const regex = new RegExp(category.replace(/-/g, " "), "i");
      orConditions.push({ subCategory: regex });
      orConditions.push({ articleType: regex });
    }

    if (search) {
      const rx = new RegExp(search, "i");
      orConditions.push({ productDisplayName: rx });
      orConditions.push({ articleType: rx });
      orConditions.push({ subCategory: rx });
      orConditions.push({ masterCategory: rx });
    }

    if (orConditions.length) {
      filter.$or = orConditions;
    }

    const items = await Product.find(filter).limit(parseInt(limit));
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

/**
 * GET /api/products/:id
 */
// router.get("/:id", async (req, res) => {
//   try {
//     const item = await Product.findById(req.params.id);
//     if (!item) return res.status(404).json({ error: "Product not found" });
//     res.json(item);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to fetch product" });
//   }
// });
router.get("/:id", async (req, res) => {
  try {
    let item = await Product.findById(req.params.id);

    if (!item) {
      // if not found in Product collection, try Discount
      const Discount = require("../models/Discount");
      item = await Discount.findById(req.params.id);
    }

    if (!item) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});


module.exports = router;
