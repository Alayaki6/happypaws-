/* =========================================
   HAPPYPAWS BACKEND
========================================= */

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const PORT =
  process.env.PORT || 5000;


/* =========================================
   MIDDLEWARE
========================================= */

app.use(
  cors({
    origin: "*"
  })
);

app.use(
  express.json()
);


/* =========================================
   STORE INFORMATION
========================================= */

const store = {

  name:
    "HappyPaws",

  country:
    "United States",

  currency:
    "USD",

  email:
    "support@happypaws.com"

};


/* =========================================
   PRODUCTS
========================================= */

const products = [

  {
    id: 1,

    name:
      "Premium Dog Comfort Bed",

    category:
      "Dogs",

    price:
      49.99,

    image:
      "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=900&q=85",

    description:
      "A comfortable and supportive bed designed to give your dog a cozy place to rest."

  },


  {
    id: 2,

    name:
      "Interactive Cat Toy",

    category:
      "Cats",

    price:
      19.99,

    image:
      "https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=900&q=85",

    description:
      "An interactive toy designed to keep curious cats entertained and active."

  },


  {
    id: 3,

    name:
      "Adjustable Pet Collar",

    category:
      "Accessories",

    price:
      14.99,

    image:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=85",

    description:
      "A comfortable adjustable collar suitable for everyday walks and adventures."

  },


  {
    id: 4,

    name:
      "Pet Grooming Brush",

    category:
      "Grooming",

    price:
      17.99,

    image:
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=900&q=85",

    description:
      "A grooming brush designed to help keep your pet's coat clean and healthy."

  },


  {
    id: 5,

    name:
      "Premium Pet Bowl",

    category:
      "Essentials",

    price:
      24.99,

    image:
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=900&q=85",

    description:
      "A durable everyday bowl for food and water."

  },


  {
    id: 6,

    name:
      "Cozy Pet Blanket",

    category:
      "Comfort",

    price:
      29.99,

    image:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=85",

    description:
      "A soft blanket designed to give pets a warm and comfortable place to relax."

  }

];


/* =========================================
   HEALTH CHECK
========================================= */

app.get(
  "/api/health",
  (req, res) => {

    res.json({

      success:
        true,

      message:
        "HappyPaws API is running.",

      timestamp:
        new Date().toISOString()

    });

  }
);


/* =========================================
   STORE INFORMATION
========================================= */

app.get(
  "/api/store",
  (req, res) => {

    res.json({

      success:
        true,

      store

    });

  }
);


/* =========================================
   GET ALL PRODUCTS
========================================= */

app.get(
  "/api/products",
  (req, res) => {

    res.json({

      success:
        true,

      products

    });

  }
);


/* =========================================
   GET SINGLE PRODUCT
========================================= */

app.get(
  "/api/products/:id",
  (req, res) => {

    const product =
      products.find(
        (item) =>
          String(item.id) ===
          String(req.params.id)
      );


    if (!product) {

      return res
        .status(404)
        .json({

          success:
            false,

          message:
            "Product not found."

        });

    }


    res.json({

      success:
        true,

      product

    });

  }
);


/* =========================================
   SEARCH PRODUCTS
========================================= */

app.get(
  "/api/products/search",
  (req, res) => {

    const query =
      String(
        req.query.q || ""
      )
        .trim()
        .toLowerCase();


    if (!query) {

      return res.json({

        success:
          true,

        products

      });

    }


    const results =
      products.filter(
        (product) =>

          product.name
            .toLowerCase()
            .includes(query)

          ||

          product.category
            .toLowerCase()
            .includes(query)

          ||

          product.description
            .toLowerCase()
            .includes(query)

      );


    res.json({

      success:
        true,

      products:
        results

    });

  }
);


/* =========================================
   CREATE ORDER
========================================= */

app.post(
  "/api/orders",
  (req, res) => {

    const {
      customer,
      items
    } = req.body;


    if (
      !customer ||
      !items ||
      !Array.isArray(items) ||
      items.length === 0
    ) {

      return res
        .status(400)
        .json({

          success:
            false,

          message:
            "Customer information and order items are required."

        });

    }


    const order = {

      id:
        `HP-${Date.now()}`,

      customer,

      items,

      status:
        "pending_payment",

      createdAt:
        new Date().toISOString()

    };


    console.log(
      "New HappyPaws order:",
      order
    );


    res.status(201).json({

      success:
        true,

      message:
        "Order created successfully.",

      order

    });

  }
);


/* =========================================
   404 HANDLER
========================================= */

app.use(
  (req, res) => {

    res
      .status(404)
      .json({

        success:
          false,

        message:
          "Route not found."

      });

  }
);


/* =========================================
   ERROR HANDLER
========================================= */

app.use(
  (
    error,
    req,
    res,
    next
  ) => {

    console.error(
      error
    );


    res
      .status(500)
      .json({

        success:
          false,

        message:
          "Internal server error."

      });

  }
);


/* =========================================
   START SERVER
========================================= */

app.listen(
  PORT,
  () => {

    console.log(
      `HappyPaws API running on port ${PORT}`
    );

  }
);
