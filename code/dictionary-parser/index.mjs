import fs from "fs"

let words = []
const writeFile = "5words.json";

let res = fs.readFileSync("english.txt", "utf-8")
res = res.split("\n")
console.log(res)

res.forEach(r => {
    if(r.length == 5)
        words.push(r)
})

console.log(words)
fs.writeFileSync(writeFile, JSON.stringify(words));