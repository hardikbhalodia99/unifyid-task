const json2csv = require('json-2-csv')
const jsontoxml = require('jsontoxml')
const fs = require('fs')
const data = require('./users.json')

var temp = []
var xmldata = () => {
  data.forEach((element) => {
    const k = jsontoxml({ user: element })
    temp.push(k)
  })
}
xmldata()
var xml = jsontoxml({ users: temp })
//XML writer

fs.writeFile('users.xml', xml, (err) => {
  if (err) {
    console.log('Error writing file', err)
  } else {
    console.log('Successfully wrote file')
  }
})

//CSV writer

json2csv.json2csv(data, (err, res) => {
  fs.writeFile('users.csv', res, (err) => {
    if (err) {
      console.log('Error writing file', err)
    } else {
      console.log('Successfully wrote file')
    }
  })
})
