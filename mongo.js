const mongoose = require('mongoose')

const password = process.argv[2]

const url =
  `mongodb+srv://ollipo:${password}@cluster0.gkabg.mongodb.net/person-app?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: Number
})

const Person = mongoose.model('Person', personSchema)

const name = process.argv[3]
const number = process.argv[4]


const person = new Person({
  name: name,
  number: number
})

if (process.argv.length>3) {
    person.save().then(response => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
    })
}

if (process.argv.length===3) {
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {
          console.log(person.name, person.number)
        })
        mongoose.connection.close()
      })
}
