const _ = require('lodash')
const csv = require('csvtojson')
const fs = require('fs')
const xml2json = require('xml2json')

const jsonData = require('./data/users.json')

const csvFilePath = './data/users.csv'
const xmlFilePath = './data/users.xml'

const readCsv = () => {
  return csv().fromFile(csvFilePath)
}

const readXml = () => {
  const xmlString = fs.readFileSync(xmlFilePath)
  return Promise.resolve(JSON.parse(xml2json.toJson(xmlString)))
}

async function init() {
  const xmlData = await readXml()
  const csvData = await readCsv()

  xmlData.users.user.forEach((item) => {
    item.userid = parseInt(item.userid)
  })
  const xmlCleanData = xmlData.users.user

  const csvCleanData = []
  csvData.forEach((item) => {
    const keys = Object.keys(item)
    const user = {}
    keys.forEach((k) => {
      user[k.toLocaleLowerCase().replace(' ', '')] = item[k]
    })
    user.userid = parseInt(user.userid)
    csvCleanData.push(user)
  })

  const jsonCleanData = []
  jsonData.forEach((item) => {
    const keys = Object.keys(item)
    const user = {}
    keys.forEach((k) => {
      user[k.replace('_', '')] = item[k]
    })
    jsonCleanData.push(user)
  })

  const data = xmlCleanData.concat(csvCleanData.concat(jsonCleanData))
  const newdata = _.sortBy(data, ['userid'])

  const jsonString = JSON.stringify(newdata)

  //JSON writer

  fs.writeFile('./users.json', jsonString, (err) => {
    if (err) {
      console.log('Error writing file', err)
    } else {
      console.log('Successfully wrote file')
    }
  })
}

init()
