require("dotenv").config();
const mongoose = require("mongoose");

// 1 # Instalar y configurar Mongoose

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((e) => console.log("err:" + e));

// 2 # Crear un modelo

const personShema = mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String],
});

let Person = mongoose.model("Person", personShema);

// 3 # Crear y guardar un registro de un modelo

const createAndSavePerson = (done) => {
  const person = new Person({
    name: "Pepe Trueno2",
    age: 26,
    favoriteFoods: ["Pizzas", "Carne", "Pollo"],
  });
  person.save(function(err, data) {
    console.log(err ? "error" : "bien ok ok");
  });
  // person
  //   .save()
  //   .then(() => console.log("Persona registrada"))
  //   .catch((err) => {
  //     console.error(err);
  //   });
  //done(null /*, data*/);
};
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople).save(function(err, data) {
    console.log(err ? "error" : "bien ok ok");
  });
  // done(null /*, data*/);
};

const findPeopleByName = (personName, done) => {
  done(null /*, data*/);
};

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
