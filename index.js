const mongoose = require('mongoose')

// connect to mongoDb using the .connect() method
// -- it returns a promise use .then() to perform an action after connected .catch() to get any error while connecting
mongoose
  .connect('mongodb://localhost/todo-list-app')
  .then(() => console.log('connected to mongoDb...'))
  .catch((err) => console.log('error connecting to mongoDb', err))
// -------------------------------------------------------------------------------------------

// Create a model of the schema for the collection : note -> it is a class
const Todos = mongoose.model(
  // -- collection name
  'Todo',
  // -- Schema for document
  new mongoose.Schema({
    todo: { type: 'String', required: true },
    done: { type: Boolean, required: true },
    date: { type: Date, default: Date.now },
  }),
)
// -------------------------------------------------------------------------------------------

// function to add documents
function addTodo(newTodo) {
  // -- document to be saved
  const todos = new Todos(newTodo)

  // -- save document then log the saved document on console
  todos
    .save()
    .then((result) => console.log(result))
    .catch((err) => console.error(err))
}
// -------------------------------------------------------------------------------------------

// read document from the database
// -- read all the document in the database
function readAllTodo() {
  // -- find() get all document
  Todos.find()
    .then((todos) => console.log(todos))
    .catch((err) => console.error(err))
}
// -- read a single document in the database with the (id)
function readOneTodo(id) {
  // ---- findById() get one document with the provided (id)
  Todos.findById(id)
    // ---- the select() add a filter to the property to the return from the document
    .select('todo')
    .then((todos) => console.log(todos))
    .catch((err) => console.error(err))
}
// -------------------------------------------------------------------------------------------

// update a document
// -- the function recive two args
// ---- id of the document
// ---- the update document
function updateTodo(id, newTodo) {
  // //   -- : note -> this do not return the updated object
  //     const result = Todos.updateOne(
  // // -- the filter object to filter document to be updated
  //       { _id: id },
  //       {
  //         $set: newTodo,
  //       },
  //     )
  //       .then((result) => console.log('New update--> ', result))
  //       .catch((err) => console.error(err))

  // -- to get the document that was updated make use of the findByIdAndUpdate()

  const result = Todos.findByIdAndUpdate(
    // -- needs only the id of the document
    id,
    // -- and the new document to be updated
    {
      $set: newTodo,
    },
    // -- to get the new document that was updated make use of the 3rd arg {new: true}
    { new: true },
  )
    .then((result) => console.log('New update--> ', result))
    .catch((err) => console.error(err))
}
// -------------------------------------------------------------------------------------------

// delete a document
function deleteTodo(id) {
  //   // -- this requries an object for filteing the document to be deleted
  //   // -- deleteOne() will delete the fiest true document
  //   // -- to delete more than one make use of the deleteMany({filter: 'value'})
  //   Todos.deleteOne({ _id: id })
  //   .then((result) => console.log(result))
  //   .catch((err) => console.error('Error ->', err))

  //  -- : note -> this do not return the document deleted to get the document use findByIdAndRemove(id), with just an arg of (id) not object
  Todos.findByIdAndRemove(id)
    .then((result) => console.log(result))
    .catch((err) => console.error('Error ->', err))
}
// -------------------------------------------------------------------------------------------

// call function

// addTodo({
//   todo: ' action 3',
//   done: false,
// })
// // -------------------------------------------------------------------------------------------
// readAllTodo()
// // -------------------------------------------------------------------------------------------
// readOneTodo('62174f576a26ea5679fa8db3')
// // -------------------------------------------------------------------------------------------
// updateTodo(
//   // -- the id to the document to be updated
//   '62174f18936e74cc0173f57e',
//   // -- the new document to be updated {property: value}
//   { todo: 'updated todo 3' },
// )
// // -------------------------------------------------------------------------------------------
// deleteTodo('6217501293dc8f31345932c3')
// // -------------------------------------------------------------------------------------------
