// src/TodoList.tsx

import React from 'react';
import { Table } from 'react-bootstrap';
import { Todo } from './types';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onEdit: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
  onComplete: (todo: Todo) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onEdit, onDelete, onComplete }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Status</th>
          <th>Task</th>
          <th>Edit</th>
          <th>Complete</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onEdit={onEdit} onDelete={onDelete} onComplete={onComplete} />
        ))}
      </tbody>
    </Table>
  );
};

export default TodoList;
