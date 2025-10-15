const express = require('express');
const app = express();

// Passport configs

// Routes
const indexRouter = require('./routes/indexRouter')
app.use('/', indexRouter)

// App running
const PORT = 3000;
app.listen(PORT, (err) => {
    if (err) {
        console.log("App failed to run.");
        throw new Error(err);
    } 
    console.log(`App running on PORT ${PORT}`);
});
