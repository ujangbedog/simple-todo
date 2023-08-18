// src/TodoItem.tsx

import React from 'react';
import { Button, Badge } from 'react-bootstrap';
import { Todo } from './types';

interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
  onComplete: (todo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onEdit, onDelete, onComplete }) => {
  return (
    <tr>
      <td>
        {todo.completed ? <Badge className="bg-success">Completed</Badge> : <Badge className="bg-warning">Pending</Badge>}
      </td>
      <td className={todo.completed ? 'text-muted' : ''}>{todo.task}</td>
      <td>
        <Button variant="primary" onClick={() => onEdit(todo)} disabled={todo.completed}>Edit</Button>
      </td>
      <td>
        <Button variant="success" onClick={() => onComplete(todo)} disabled={todo.completed}>Complete</Button>
      </td>
      <td>
        <Button variant="danger" onClick={() => onDelete(todo)}>Delete</Button>
      </td>
    </tr>
  );
};

export default TodoItem;
