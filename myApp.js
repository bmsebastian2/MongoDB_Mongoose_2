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
    done(null, data);
  });
  // person
  //   .save()
  //   .then(() => console.log("Persona registrada"))
  //   .catch((err) => {
  //     console.error(err);
  //   });

};

var arrayOfPeople = [
  { name: "Frankie", age: 74, favoriteFoods: ["Del Taco"] },
  { name: "Sol", age: 76, favoriteFoods: ["roast chicken"] },
  { name: "Robert", age: 78, favoriteFoods: ["wine"] }
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, people) {
     if (err) return console.log(err)
    done(null, people);
  })

};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function(err, findPeople) {
        if (err) return console.log(err)
    done(null, findPeople);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function(err, findFood) {
       if (err) return console.log(err)
    done(null, findFood);
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, personById) {
       if (err) return console.log(err)
    done(null, personById);
  })
};

const findEditThenSave = async (personId, done) => {
  const foodToAdd = "hamburger";
  try {
    const doc = await Person.findById(personId)
    doc.favoriteFoods.push(foodToAdd)
    doc.save(function(err, data) {
      if (err) return err
      done(null, data);
    })
  } catch {
    console.log(err ? "error" : "bien ok ok");
  }
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, function(err, data) {
        if (err) return console.log(err)
    done(null, data);
  })
  //done(null /*, data*/);
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function(err, removedDoc) {
    if (err) return console.log(err)
    done(null, removedDoc);
  })
};

const removeManyPeople = (done) => {

   const nameToRemove = "Mary";
  Person.remove(
    {name: nameToRemove},
    (err, data) => {
      if(err) return console.log(err);
      done(null, data);
    }
  )
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods:foodToSearch})
    .limit(2)
    .sort({name:1})    
    .select("name favoriteFoods")
    .exec((err,data)=>{
      if(err) return console.log(err)  
      done(null , data);
      })

  /*let findQuery =Person.find({name:foodToSearch})
  
  let find = findQuery.sort({age:-1})
  
  let limit = find.limit(2)
  
  let select = limit.select("name favoriteFoods")
      
  select.exec((err,data)=>{
      if (err) return console.log(err)  
        done(null , data);
      } )*/
  
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
