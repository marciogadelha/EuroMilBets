const express = require('express')
const cors = require('cors')

const port = process.env.PORT || 3000

const app = express()

app.use(express.static('./'));

// var corsOptions = {
//   origin: '*',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
// }
app.use(cors())

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.listen(port, () => {
  console.log(`Server running at port ${port}`)
})
