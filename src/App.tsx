import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { Todo } from "./types";
import TodoList from "./TodoList";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentTodo, setCurrentTodo] = useState<string>("");
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const addTodo = () => {
    if (currentTodo.trim()) {
      setTodos([...todos, { id: Date.now(), task: currentTodo, completed: false }]);
      setCurrentTodo("");
      setShowAddModal(false);
      Swal.fire({
        title: "Success!",
        text: "Todo has been added.",
        icon: "success",
        confirmButtonText: "OK",
      });
    }
  };

  const deleteTodo = (todo: Todo) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!"
    }).then((result) => {
      if (result.isConfirmed) {
        setTodos(todos.filter(t => t.id !== todo.id));
        Swal.fire(
          "Deleted!",
          "Your todo has been deleted.",
          "success"
        );
      }
    });
  };
  

  const completeTodo = (todo: Todo) => {
    const updatedTodos = todos.map(t => t.id === todo.id ? { ...t, completed: true } : t);
    setTodos(updatedTodos);
    Swal.fire({
      title: "Done!",
      text: "Todo has been marked as completed.",
      icon: "success",
      confirmButtonText: "OK",
    });
  };
  

  const startEditing = (todo: Todo) => {
    setEditingTodo(todo);
    setCurrentTodo(todo.task);
    setShowEditModal(true);
  };

  const saveChanges = () => {
    if (editingTodo && currentTodo.trim()) {
      const updatedTodos = todos.map(t => t.id === editingTodo.id ? { ...t, task: currentTodo } : t);
      setTodos(updatedTodos);
      setShowEditModal(false);
      setEditingTodo(null);
      setCurrentTodo("");
      Swal.fire({
        title: "Updated!",
        text: "Todo has been updated.",
        icon: "success",
        confirmButtonText: "OK",
      });
    }
  };
  

  return (
    <div className="container mt-5">
      <h1 className="text-center">Todo App</h1>
      <Button onClick={() => setShowAddModal(true)}>Add Task</Button>
      <TodoList todos={todos} onEdit={startEditing} onDelete={deleteTodo} onComplete={completeTodo} />

      {/* Modal for adding task */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Task</Form.Label>
            <Form.Control
              value={currentTodo}
              onChange={e => setCurrentTodo(e.target.value)}
              placeholder="Add a new task..."
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={addTodo}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for editing task */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Task</Form.Label>
            <Form.Control
              value={currentTodo}
              onChange={e => setCurrentTodo(e.target.value)}
              placeholder="Edit task..."
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={saveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
