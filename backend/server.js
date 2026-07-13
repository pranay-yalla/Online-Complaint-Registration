const express = require("express");
const cors = require("cors");

require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());

app.use(authRoutes);
app.use(userRoutes);
app.use(complaintRoutes);
app.use(messageRoutes);

app.listen(PORT, () => console.log(`server started at ${PORT}`));
