const express = require('express');
const app = express();
const cors = require('cors')

// App configs
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

// Passport configs
require('./configs/passportConfig')

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
