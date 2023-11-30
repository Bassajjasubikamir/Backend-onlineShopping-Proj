const express = require('express')
const app = express()
const port = 3001
const usersRoute = require("./v2/routes/usersRoute")
// const authRoute = require("./v2/routes/authRoute")


//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//Routes
// app.use("/api/v2/auth", authRoute)
app.use("/api/v2/users", usersRoute)


app.post('*',(req,res)=>{
    res.status(404).json({status:"Endpoint doesn't exist"})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
