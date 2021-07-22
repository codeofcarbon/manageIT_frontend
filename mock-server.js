const fs = require("fs")
const http = require("http")
const port = 8080


const server = http.createServer((req, res) => {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200')
    res.setHeader('Access-Control-Allow-Method', 'GET, POST, PUT, DELETE')
    res.setHeader('Access-Control-allow-Header', '*')
    res.setHeader('Content-Type', 'application/json')
    
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