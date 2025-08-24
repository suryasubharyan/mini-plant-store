const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Plant = require("./models/Plant.model");

dotenv.config();

const plants = [
     {
    name: "Snake Plant",
    price: 350,
    categories: ["Indoor", "Air Purifying", "Home Decor"],
    available: true,
  },
  {
    name: "Aloe Vera",
    price: 250,
    categories: ["Indoor", "Medicinal", "Succulent"],
    available: true,
  },
 {
    name: "Peace Lily",
    price: 400,
    categories: ["Indoor", "Air Purifying", "Flowering"],
    available: true,
  },
    {
    name: "Money Plant",
    price: 300,
    categories: ["Indoor", "Vastu", "Climbing"],
    available: true,
  },
   {
    name: "Cactus",
    price: 200,
    categories: ["Outdoor", "Succulent"],
    available: true,
  }, {
    name: "Cactus",
    price: 200,
    categories: ["Outdoor", "Succulent"],
    available: true,
  }, {
    name: "Cactus",
    price: 200,
    categories: ["Outdoor", "Succulent"],
    available: true,
  }, {
    name: "Cactus",
    price: 200,
    categories: ["Outdoor", "Succulent"],
    available: true,
  }, {
    name: "Cactus",
    price: 200,
    categories: ["Outdoor", "Succulent"],
    available: true,
  }, {
    name: "Cactus",
    price: 200,
    categories: ["Outdoor", "Succulent"],
    available: true,
  }, {
    name: "Cactus",
    price: 200,
    categories: ["Outdoor", "Succulent"],
    available: true,
  }, {
    name: "Cactus",
    price: 200,
    categories: ["Outdoor", "Succulent"],
    available: true,
  }, {
    name: "Cactus",
    price: 200,
    categories: ["Outdoor", "Succulent"],
    available: true,
  }, {
    name: "Cactus",
    price: 200,
    categories: ["Outdoor", "Succulent"],
    available: true,
  }, {
    name: "Cactus",
    price: 200,
    categories: ["Outdoor", "Succulent"],
    available: true,
  }, {
    name: "Cactus",
    price: 200,
    categories: ["Outdoor", "Succulent"],
    available: true,
  }, {
    name: "Cactus",
    price: 200,
    categories: ["Outdoor", "Succulent"],
    available: true,
  }, {
    name: "Cactus",
    price: 200,
    categories: ["Outdoor", "Succulent"],
    available: true,
  }, {
    name: "Cactus",
    price: 200,
    categories: ["Outdoor", "Succulent"],
    available: true,
  }, {
    name: "Cactus",
    price: 200,
    categories: ["Outdoor", "Succulent"],
    available: true,
  }, {
    name: "Cactus",
    price: 200,
    categories: ["Outdoor", "Succulent"],
    available: true,
  }, {
    name: "Cactus",
    price: 200,
    categories: ["Outdoor", "Succulent"],
    available: true,
  }, {
    name: "Cactus",
    price: 200,
    categories: ["Outdoor", "Succulent"],
    available: true,
  }, {
    name: "Cactus",
    price: 200,
    categories: ["Outdoor", "Succulent"],
    available: true,
  }, {
    name: "Cactus",
    price: 200,
    categories: ["Outdoor", "Succulent"],
    available: true,
  }, {
    name: "Cactus",
    price: 200,
    categories: ["Outdoor", "Succulent"],
    available: true,
  }, {
    name: "Cactus",
    price: 200,
    categories: ["Outdoor", "Succulent"],
    available: true,
  }, {
    name: "Cactus",
    price: 200,
    categories: ["Outdoor", "Succulent"],
    available: true,
  }, {
    name: "Cactus",
    price: 200,
    categories: ["Outdoor", "Succulent"],
    available: true,
  }, {
    name: "Cactus",
    price: 200,
    categories: ["Outdoor", "Succulent"],
    available: true,
  }, {
    name: "Cactus",
    price: 200,
    categories: ["Outdoor", "Succulent"],
    available: true,
  }, {
    name: "Cactus",
    price: 200,
    categories: ["Outdoor", "Succulent"],
    available: true,
  }, {
    name: "Cactus",
    price: 200,
    categories: ["Outdoor", "Succulent"],
    available: true,
  }, {
    name: "Cactus",
    price: 200,
    categories: ["Outdoor", "Succulent"],
    available: true,
  }, {
    name: "Cactus",
    price: 200,
    categories: ["Outdoor", "Succulent"],
    available: true,
  }, {
    name: "Cactus",
    price: 200,
    categories: ["Outdoor", "Succulent"],
    available: true,
  }, {
    name: "Cactus",
    price: 200,
    categories: ["Outdoor", "Succulent"],
    available: true,
  }, {
    name: "Cactus",
    price: 200,
    categories: ["Outdoor", "Succulent"],
    available: true,
  }, {
    name: "Cactus",
    price: 200,
    categories: ["Outdoor", "Succulent"],
    available: true,
  }, {
    name: "Cactus",
    price: 200,
    categories: ["Outdoor", "Succulent"],
    available: true,
  }, {
    name: "Cactus",
    price: 200,
    categories: ["Outdoor", "Succulent"],
    available: true,
  }, {
    name: "Cactus",
    price: 200,
    categories: ["Outdoor", "Succulent"],
    available: true,
  }, {
    name: "Cactus",
    price: 200,
    categories: ["Outdoor", "Succulent"],
    available: true,
  }, {
    name: "Cactus",
    price: 200,
    categories: ["Outdoor", "Succulent"],
    available: true,
  }, {
    name: "Cactus",
    price: 200,
    categories: ["Outdoor", "Succulent"],
    available: true,
  }, {
    name: "Cactus",
    price: 200,
    categories: ["Outdoor", "Succulent"],
    available: true,
  }, {
    name: "Cactus",
    price: 200,
    categories: ["Outdoor", "Succulent"],
    available: true,
  }, {
    name: "Cactus",
    price: 200,
    categories: ["Outdoor", "Succulent"],
    available: true,
  }, {
    name: "Cactus",
    price: 200,
    categories: ["Outdoor", "Succulent"],
    available: true,
  }, {
    name: "Cactus",
    price: 200,
    categories: ["Outdoor", "Succulent"],
    available: true,
  }, {
    name: "Cactus",
    price: 200,
    categories: ["Outdoor", "Succulent"],
    available: true,
  }, {
    name: "Cactus",
    price: 200,
    categories: ["Outdoor", "Succulent"],
    available: true,
  }, {
    name: "Cactus",
    price: 200,
    categories: ["Outdoor", "Succulent"],
    available: true,
  }, {
    name: "Cactus",
    price: 200,
    categories: ["Outdoor", "Succulent"],
    available: true,
  }, {
    name: "Cactus",
    price: 200,
    categories: ["Outdoor", "Succulent"],
    available: true,
  },
];

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
       console.log("MongoDB connected");

       await Plant.deleteMany(); // clear old data
       await Plant.insertMany(plants);

       console.log("sample plants added successfully!");
       process.exit();
    })
    .catch((err) => {
         console.error("Seeder Error:", err);
         process.exit(1);
    });