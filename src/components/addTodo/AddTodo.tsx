import React, { useState } from 'react';
import './addtodo.css';

interface TodoItem {
  id: number;
  titel: string;
  discription: string;
  setDate: string;
  endDate: string;
}

const TodoForm: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newItem: TodoItem = {
      id: 0, // Generating id dynamically
      titel: title,
      discription: description,
      setDate: startDate,
      endDate: endDate
    };

    try {
      const response = await fetch('https://localhost:44315/api/Todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        console.log('Data added successfully');
        window.location.reload();
        // Clear the form fields after successful submission
        setTitle('');
        setDescription('');
        setStartDate('');
        setEndDate('');
      } else {
        console.error('Failed to add data');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  return (
    <div className='container justify-content-center mt-5'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 row">
          <label htmlFor="todoTitle" className="col-sm-2 col-form-label form-label">Todo Title</label>
          <div className="col-sm-10">
            <input 
              type="text" 
              className="form-control form-input" 
              id="todoTitle" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="todoDescription" className="col-sm-2 col-form-label form-label">Todo Description</label>
          <div className="col-sm-10">
            <input 
              type="text" 
              className="form-control form-input" 
              id="todoDescription" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="startDate" className="col-sm-2 col-form-label form-label">Todo Start Date</label>
          <div className="col-sm-10">
            <input 
              type="date" 
              className="form-control form-input" 
              id="startDate" 
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="endDate" className="col-sm-2 col-form-label form-label">Todo End Date</label>
          <div className="col-sm-10">
            <input 
              type="date" 
              className="form-control form-input" 
              id="endDate" 
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mb-3 row">
          <div className="col-sm-10 offset-sm-2">
            <button type="submit" className="btn-add btn btn-success">Add new Todo</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
