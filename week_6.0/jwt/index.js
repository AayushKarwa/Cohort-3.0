const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "ilovekiara";
const app = express();

app.use(express.json()); // Corrected middleware

const users = [];

// Middleware for authentication
function auth(req, res, next) {
    try {
        // Extract token from Authorization header
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            throw new Error("Token not provided");
        }

        const decodedInfo = jwt.verify(token, JWT_SECRET);
        req.user = decodedInfo.username; 
        next(); 
    } catch (error) {
        res.status(403).json({
            message: "You are not logged in or token is invalid!"
        });
    }
}

// Middleware for logging requests
function logger(req, res, next) {
    console.log(`${req.method} request came!`);
    next();
}

// Home route
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// Signup route
app.post("/signup", logger, (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    users.push({ username, password });
    console.log(users);
    res.json("You are signed in!");
});

// Login route
app.post("/login", logger, (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const foundUser = users.find(user => user.username === username && user.password === password);

    if (foundUser) {
        const token = jwt.sign({ username: username }, JWT_SECRET);
        res.json({ token: token });
        console.log(users);
    } else {
        res.status(403).send({ message: "Invalid username or password" });
    }
});

// Protected route to get user info
app.get("/me", logger, auth, (req, res) => {
    const username = req.user;
    console.log(username);
    const foundUser = users.find(user => user.username === username);

    if (foundUser) {
        res.json({
            username: foundUser.username,
            password: foundUser.password
        });
    } else {
        res.json({
            message: "Token invalid!"
        });
    }
});

app.listen(process.env.PORT || 8080, () => {
    console.log("Server is listening on port 8080");
});
