const express = require('express');
const validateToken = require('./middleware/auth');
const cors = require('cors')
const loginRouter = require('./routes/userRoutes');
const { eventRouter, userRouter } = require('./routes/postRoutes');

const app = express();
const PORT = process.env.PORT || 5000;


// middle ware
app.use(cors())
app.use(express.json());

// MongoDb connection
require('./database/dbConnection')

// Application Routes
app.use("/login", loginRouter) //Login Route
app.use("/user", validateToken, userRouter)
app.use("/event", validateToken, eventRouter) //Post route

// Server Connection
app.listen(PORT, () => console.log(`Server is running at ${PORT}`))