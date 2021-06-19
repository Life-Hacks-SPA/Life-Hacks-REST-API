const app = require("express")();

const {PORT} = require("./config")

require("./config/express")(app)

app.get("/", (req, res) => {
    res.json({message: "it works"})
})

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))