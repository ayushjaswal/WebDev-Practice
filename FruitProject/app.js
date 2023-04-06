
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB");

const fruitsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "No Name!!"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitsSchema
});

const Person = mongoose.model("Person", personSchema);
const Fruit = mongoose.model("Fruit", fruitsSchema);

const coconut = new Fruit({
  name: "Coconut",
  rating: 8, 
  review: "Works like charm"
})
// const person = new Person({
//   name: "Amy",
//   age: 37,
//   favouriteFruit: pineapple 
// });

// const orange = new Fruit({
//   name: "Orange",
//   rating: 6, 
//   review: "They are sour"
// })
// const banana = new Fruit({
//   name: "Banana",
//   rating: 7, 
//   review: "Good for health"
// })

async function getItems(){
  const Items = await Fruit.find({});
  
  Items.forEach(function(fruits){
    console.log(fruits.name + ": " + fruits.review);
  })
}

// coconut.save()
// Fruit.deleteOne({name: "Brims"});
async function updateItem(){
  const up = await Person.updateOne({name: "John"},{age: 37});
  mongoose.connection.close();
}
updateItem();
// person.save()
// getItems(s);