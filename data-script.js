const fs = require('fs')

let data = ''

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function getSampleProject(id) {
    return `{
        "id": ${id},
        "name": "Project${id}",
        "description": "this is desc ${id}"
    },
    `
}
function getSampleEndProject(id) {
    return `{
        "id": ${id},
        "name": "Project${id}",
        "description": "this is desc ${id}"
    }
] 
    `
}

function getSampleSprint(id) {
    return `{
        "id": ${id},
        "name": "Sprint${id}",
        "startDate": "${id} July 2021, 3:30 PM",
        "endDate": "${id + 7} July 2021, 3:30 PM",
        "storyPointsToSpend": "${id + 20}",
        "tasksIds": []
    },
    `
}
function getSampleEndSprint(id) {
    return `{
        "id": ${id},
        "name": "Sprint${id}",
        "startDate": "${id} July 2021, 3:30 PM",
        "endDate": "${id + 7} July 2021, 3:30 PM",
        "storyPointsToSpend": "${id + 20}",
        "tasksIds": []
    }
] 
    `
}

function getSampleTask(id) {
    return `{
        "id": ${id},
        "name": "Task${id}",
        "description": "this is desc ${id}",
        "storyPoints": "${getRandomInt(1, 8)}",
        "progress": "TO_DO",
        "priority": "${getRandomInt(1, 6)}",
        "sprintId": ${getRandomInt(1, 17)}
    },
    `
}
function getSampleEndTask(id) {
    return `{
        "id": ${id},
        "name": "Task${id}",
        "description": "this is desc ${id}",
        "storyPoints": "${getRandomInt(1, 7)}",
        "progress": "TO_DO",
        "priority": "${getRandomInt(1, 5)}",
        "sprintId": ${getRandomInt(1, 17)}
    }
]
    `
}


for (i = 0; i < 4; i++) {
    generateData(getSampleProject(i + 1), getSampleEndProject(i + 1), i, 4)
}
writeToFile('./mock-projects-data.json')

data = ''


for (i = 0; i < 16; i++) {
    generateData(getSampleSprint(i + 1), getSampleEndSprint(i + 1), i, 16)
}
writeToFile('./mock-sprints-data.json')

data = ''


for (i = 0; i < 20; i++) {
    generateData(getSampleTask(i + 1), getSampleEndTask(i + 1), i, 20)
}
writeToFile('./mock-tasks-data.json')

data = ''



function writeToFile(fileName) {
    fs.writeFile(fileName, data, err => {
        if (err) {
            console.log(err)
            return
        }
        console.log('Succesfully saved to file ' + fileName)
    })
}

function generateData(sampleData, sampleEndData, counter, dataLenght) {
    if (counter === 0) {
        data += "["
    }

    if (counter === dataLenght - 1) {
        data += sampleEndData
        return
    }

    data += sampleData
}


// for (i = 0; i < 20; i++) {
//     if (i === 0) {
//         data += "["
//     }

//     let actualId = counter++

//     if (i === 19) {
//         data += `  
//     {
//         "id": ${actualId},
//         "name": "Project${actualId}",
//         "description": "this is desc ${actualId}"
//     }
// ]
//           `
//         continue
//     }

//     data += getSampleProject(actualId)
// }


// fs.writeFile('./mock-projects-data.json', data, err => {
//     if(err) {
//         console.log(err)
//         return
//     }
//     console.log('Succesfully saved to file')
// })
// console.log(data)