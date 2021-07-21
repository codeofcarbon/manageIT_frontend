const fs = require("fs")
const http = require("http")
const port = 8000


const server = http.createServer((req, res) => {
    
if(req.method === "GET" && req.url === "/api/v1/projects") {
    fs.readFile('./mock-projects-data.json', (err, data) => {
        if(err) {
            console.log(err)
            res.write('Something went wrong :(')
            res.end
            return
        }
        res.write(data)
        res.end()
    })
}
if(req.method === "GET" && req.url === "/api/v1/sprints") {
    fs.readFile('./mock-sprints-data.json', (err, data) => {
        if(err) {
            console.log(err)
            res.write('Something went wrong :(')
            res.end
            return
        }
        res.write(data)
        res.end()
    })
}
if(req.method === "GET" && req.url === "/api/v1/tasks") {
    fs.readFile('./mock-tasks-data.json', (err, data) => {
        if(err) {
            console.log(err)
            res.write('Something went wrong :(')
            res.end
            return
        }
        res.write(data)
        res.end()
    })
}

})


server.listen(port)
console.log('Server is listening on port ' + port)