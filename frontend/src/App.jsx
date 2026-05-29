import { useEffect, useState } from "react";
import { X, Plus } from "lucide-react"
import { Toaster } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux";
import { createTodo, deleteTodo, editTodo, getAllTodos, markAsCompleted } from "./store/slices/todo.slice";

const App = () => {
  const dispatch = useDispatch();
  const { todos: allTodos, todo } = useSelector(state => state.todo);
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [editedMessage, setEditedMessage] = useState("");
  const [editId, setEditId] = useState("");

  useEffect(() => {
    dispatch(getAllTodos());
  }, [dispatch, allTodos, todo]);

  const openCreateForm = () => {
    setIsCreateFormOpen(true);
  };
  const closeCreateForm = () => {
    setIsCreateFormOpen(false);
  };
  const openEditForm = (id) => {
    const selectedTodo = allTodos.find((todo) => todo._id === id);

    setEditedMessage(selectedTodo?.message || "");
    setEditId(id);
    setIsEditFormOpen(true);
  };
  const closeEditForm = () => {
    setIsEditFormOpen(false);
  };

  const handleCreateTodo = () => {
    setMessage("");
    dispatch(createTodo({ message }))
    closeCreateForm();
  };

  const editTheTodo = () => {
    dispatch(editTodo({ id: editId, data: { message: editedMessage } }));
    closeEditForm();
  }

  const handleDeleteTodo = id => {
    dispatch(deleteTodo(id));
  }

  const handleIsCompledted = id => {
    dispatch(markAsCompleted(id));
  }

  return (
    <main className="max-w-screen w-full h-screen bg-black flex flex-col items-center justify-start pt-3 md:pt-10">
      <h1 className="text-2xl md:text-5xl font-bold ts text-orange-500">Today Todos</h1>
      <div className="w-full lg:w-1/2 bg-black rounded shadow-2xl shadow-amber-500 mt-2 max-h-[80vh] overflow-y-scroll scrollbar-none p-2 flex flex-col gap-2 relative">
        {
          allTodos?.length > 0 ?
            allTodos?.map((todo, index) => (
              <div key={index} className="flex flex-col md:flex-row justify-between items-center p-2 border rounded bg-linear-to-r from-black to-blue-500">
                <p className="">{todo.message}</p>
                <div className="flex items-center justify-center gap-2  ">
                  <p className="text-xs text-amber-500">{new Date(todo?.createdAt).toLocaleTimeString()}</p>
                  <button onClick={() => openEditForm(todo?._id)} className="bg-linear-to-r from-black to-blue-500 px-2 rounded hover:scale-105 transition-all active:scale-90 cursor-pointer">Edit</button>
                  <button onClick={() => handleDeleteTodo(todo?._id)} className="bg-linear-to-r from-black to-red-500 px-2 rounded hover:scale-105 transition-all active:scale-90 cursor-pointer">Delete</button>
                  <input type="checkbox" onClick={() => handleIsCompledted(todo?._id)} checked={todo?.isCompleted} className="checkbox checkbox-neutral" />
                </div>
              </div>
            )) :
            <div className="text-3xl text-red-500 text-center">No todos yet</div>
        }
        <div className="fixed bottom-30 left-1/2 -translate-x-1/2">
          <button onClick={openCreateForm} className="bg-linear-to-r from-black to-green-500 px-4 mx-auto py-2 rounded-full hover:scale-105 transition-all active:scale-90 cursor-pointer flex font-bold">
            <Plus className="text-green-400" />
            <p className="">New</p>
          </button>
        </div>
        {
          isCreateFormOpen && (
            <div className="fixed bottom-1/2 left-1/2 -translate-x-1/2 bg-black p-3 rounded flex flex-col items-center justify-center border border-green-400 gap-3">
              <div className="flex items-center justify-between w-full">
                <p className="font-bold text-amber-500">New todo</p>
                <button onClick={closeCreateForm}><X className="text-red-500 cursor-pointer hover:scale-105 transition-all active:scale-90" /></button>
              </div>
              <input type="text" placeholder="Write todo here..." value={message} onChange={e => setMessage(e.target.value)} className="border border-green-400 rounded px-2 py-1 text-amber-300 outline-none" />
              <button onClick={handleCreateTodo} className="w-fit bg-linear-to-r from-black to-green-500 px-2 rounded hover:scale-105 transition-all active:scale-90 cursor-pointer">Done</button>
            </div>
          )
        }
        {
          isEditFormOpen && (
            <div className="fixed bottom-1/2 left-1/2 -translate-x-1/2 bg-black p-3 rounded flex flex-col items-center justify-center border border-green-400 gap-3">
              <div className="flex items-center justify-between w-full">
                <p className="font-bold text-amber-500">Edit todo</p>
                <button onClick={closeEditForm}><X className="text-red-500 cursor-pointer hover:scale-105 transition-all active:scale-90" /></button>
              </div>
              <input type="text" placeholder="Edited todo here..." value={editedMessage} onChange={e => setEditedMessage(e.target.value)} className="border border-green-400 rounded px-2 py-1 text-amber-300 outline-none" />
              <button onClick={editTheTodo} className="w-fit bg-linear-to-r from-black to-green-500 px-2 rounded hover:scale-105 transition-all active:scale-90 cursor-pointer">Done</button>
            </div>
          )
        }
      </div>
      <Toaster position="bottom-right" reverseOrder={false} toastOptions={{ style: { backgroundColor: "#000", border: "1px solid goldenrod", color: "goldenrod" } }} />
    </main>
  )
}

export default App