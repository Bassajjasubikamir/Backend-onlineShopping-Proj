const fs = require("fs")
const saveToDatabase = (DB) => {
    fs.writeFileSync("./v2/database/db.json", JSON.stringify(DB, null, 2),{
        encoding: "utf-8",
    })
}
module.exports = saveToDatabase