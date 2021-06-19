const app = require("express")();

const log = require('./middlewares/log')
const router = require("./router");
const {PORT} = require("./config");

require("./config/express")(app);

app.use(log);

app.use(router);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))