import Todo from "../models/todo.model.js";

const createTodo = async (req, res) => {
  try {
    const newTodo = await Todo.create(req?.body);
    if (!newTodo) return res.status(400).json({ success: false, message: "Failed to create todo" });
    res.status(201).json({ success: true, message: "Todo created successfully", data: newTodo })
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const updateTodo = async (req, res) => {
  const { id } = req?.params;
  try {
    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({ success: false, message: "Todo not found" });
    todo.message = req?.body?.message;
    await todo.save();
    res.status(200).json({ success: true, message: "Todo updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const markAsCompleted = async (req, res) => {
  const { id } = req?.params;
  try {
    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({ success: false, message: "Todo not found" });
    todo.isCompleted = !todo?.isCompleted;
    await todo.save();
    res.status(200).json({ success: true, message: "Checked/Unchecked successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req?.params;
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) return res.status(404).json({ success: false, message: "Failed to delete toto" });
    res.status(200).json({ success: true, message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getAllTodos = async (req, res) => {
  try {
    const allTodos = await Todo.find();
    res.status(200).json({ success: true, messages: "Data retirived successfully", data: allTodos });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getTodo = async (req, res) => {
  const { id } = req?.params;
  try {
    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({ success: false, message: "Todo not found" });
    res.status(200).json({ success: true, message: "Todo retrived successfully", data: todo });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { createTodo, updateTodo, markAsCompleted, deleteTodo, getAllTodos, getTodo };