const express = require('express')

const app = express();
const PORT = 3333

app.get('/projects', (req, res) => { return res.send("Hello world") })

app.listen(PORT, () => {
    console.log(`💻👂🏻Server is listening port ${PORT} ...`)
})


