// server/routes/products.js
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

/**
 * GET /api/products
 * Query params:
 *   - gender   (e.g. men, women, boys, girls)
 *   - category (slugified articleType or "all")
 *   - search   (free‑text search across name/type)
 *   - limit    (number)
 */
// server/routes/products.js
// router.get("/", async (req, res) => {
//     try {
//       const { gender, category, search, limit = 40 } = req.query;
//       const filter = {};
  
//       if (gender) {
//         filter.gender = new RegExp(`^${gender}$`, "i");
//       }
  
//       if (category && category !== "all") {
//         // turn "flip‑flops" → /flip flops/i
//         const regex = new RegExp(category.replace(/-/g, " "), "i");
  
//         // match either the subCategory *or* the articleType
//         filter.$or = [
//           { subCategory: regex },
//           { articleType: regex }
//         ];
//       }
  
//       if (search) {
//         const rx = new RegExp(search, "i");
//         filter.$or = [
//           { productDisplayName: rx },
//           { articleType:        rx },
//           { subCategory:        rx },
//           { masterCategory:     rx }
//         ];
//       }
  
//       const items = await Product.find(filter).limit(parseInt(limit));
//       res.json(items);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: "Failed to fetch products" });
//     }
//   });
router.get("/", async (req, res) => {
  try {
    const { gender, category, search, limit = 40 } = req.query;
    const filter = {};
    const orConditions = [];

    // Skip gender filter if it's "all"
    if (gender && gender.toLowerCase() !== "all") {
      filter.gender = new RegExp(`^${gender}$`, "i");
    }

    // Add category conditions
    if (category && category !== "all") {
      const regex = new RegExp(category.replace(/-/g, " "), "i");
      orConditions.push({ subCategory: regex });
      orConditions.push({ articleType: regex });
    }

    // Add search text conditions
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
 * Path param:
 *   - id = MongoDB ObjectId of the product
 */
router.get("/:id", async (req, res) => {
  try {
    const item = await Product.findById(req.params.id);
    // console.log(item);
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
