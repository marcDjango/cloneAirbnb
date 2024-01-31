const express = require("express");

const router = express.Router();
// const verifyToken = require("./middleware/verifyToken"); // Assuming you have middleware for token verification
// const validate = require("../middleware/validate"); // Assuming you have middleware for input validation

// Import your controllers
const AdminController = require("./controllers/AdminControllers");
const AmenitieController = require("./controllers/AmenitieControllers");
const BookingController = require("./controllers/BookingControllers");
const FavoriteController = require("./controllers/FavoriteControllers");
const ImageController = require("./controllers/ImageControllers");
const ListingController = require("./controllers/ListingControllers");
const ReviewController = require("./controllers/ReviewControllers");
const UserController = require("./controllers/UserControllers");

// Routes for Admins
router.get("/admins", AdminController.browse);
router.get("/admins/:id", AdminController.read);
router.put("/admins/:id", AdminController.edit);
router.post("/admins", AdminController.add);
router.delete("/admins/:id", AdminController.destroy);

// Routes for Amenities
router.get("/amenities", AmenitieController.browse);
router.get("/amenities/:id", AmenitieController.read);
router.put("/amenities/:id", AmenitieController.edit);
router.post("/amenities", AmenitieController.add);
router.delete("/amenities/:id", AmenitieController.destroy);

// Routes for Bookings
router.get("/bookings", BookingController.browse);
router.get("/bookings/:id", BookingController.read);
router.put("/bookings/:id", BookingController.edit);
router.post("/bookings", BookingController.add);
router.delete("/bookings/:id", BookingController.destroy);

// Routes for Favorites
router.get("/favorites", FavoriteController.browse);
router.get("/favorites/:id", FavoriteController.read);
router.put("/favorites/:id", FavoriteController.edit);
router.post("/favorites", FavoriteController.add);
router.delete("/favorites/:id", FavoriteController.destroy);

// Routes for Images
router.get("/images", ImageController.browse);
router.get("/images/:id", ImageController.read);
router.put("/images/:id", ImageController.edit);
router.post("/images", ImageController.add);
router.delete("/images/:id", ImageController.destroy);

// Routes for Listings
router.get("/listings", ListingController.browse);
router.get("/listings/:id", ListingController.read);
router.put("/listings/:id", ListingController.edit);
router.post("/listings", ListingController.add);
router.delete("/listings/:id", ListingController.destroy);

// Routes for Reviews
router.get("/reviews", ReviewController.browse);
router.get("/reviews/:id", ReviewController.read);
router.put("/reviews/:id", ReviewController.edit);
router.post("/reviews", ReviewController.add);
router.delete("/reviews/:id", ReviewController.destroy);

// Routes for Users
router.get("/users", UserController.browse);
router.get("/users/:id", UserController.read);
router.put("/users/:id", UserController.edit);
router.post("/users", UserController.add);
router.delete("/users/:id", UserController.destroy);

module.exports = router;
