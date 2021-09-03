import auth from "../routes/auth.js";
import users from "../routes/user.js";
import amenity from "../routes/amenity.js";
import complaint from "../routes/complaint.js";
import broadcasts from "../routes/broadcasts.js";
import dashboard from "../routes/dashboard.js";
import uploadImage from "../routes/uploadImage.js";
import payments from "../routes/payments.js";
import httpError from "../middleware/httpError.js";
import userAuth from '../middleware/auth/user.js';
import admin from "../middleware/auth/admin.js";

export default (app) => {
    
	app.use("/", auth);
	app.post("/upload", uploadImage);
	app.use("/api/users", userAuth, users);
	app.use("/api/amenities", userAuth, amenity);
    app.use('/api/broadcasts', userAuth, broadcasts);
    app.use('/api/payments', payments );
	app.use("/api/dashboard", [userAuth, admin ], dashboard);
	app.use("/api/complaints", userAuth, complaint);

	app.use((req, res, next) => res.status(404).send("Not found"));
	app.use(httpError);
};
