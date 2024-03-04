// ApiData.tsx
import React, { useState, useEffect } from 'react';
import './apiData.css';
import '../addTodo/addtodo.css';
import 'bootstrap/dist/css/bootstrap.min.css';

interface DataItem {
  id: number;
  titel: string;
  discription: string;
  setDate:String;
  endDate:String;
}


const ApiData: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [title, setTitle] = useState<String>('');
  const [description, setDescription] = useState<String>('');
  const [startDate, setStartDate] = useState<String>('');
  const [endDate, setEndDate] = useState<String>('');
  const [editingItem, setEditingItem] = useState<DataItem | null>(null); // Track the item being edited

    useEffect(() => {
    fetchData();
  }, []);
  
    // Fetch data from the API when the component mounts
    const fetchData = async () => {
     try {
      const response = await fetch('https://localhost:44315/api/Todos');
      if (response.ok) {
        const data = await response.json();
        setData(data);
      } else {
        console.error('Failed to fetch todos');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

    // delete selected todo from the API
    const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`https://localhost:44315/api/Todos/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Data deleted successfully');
        alert("Todo Deleted")
        // Fetch todos again to update the list after deletion
        fetchData();
      } else {
        console.error('Failed to delete data');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  //Lord all the TODOs to the table in the start
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newItem: DataItem = {
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

  // //Update TODO with API
   const handleUpdate = (item: DataItem) => {
    // Set the editing item and populate the form fields with its data
    setEditingItem(item);
    setTitle(item.titel);
    setDescription(item.discription);
    setStartDate(item.setDate);
    setEndDate(item.endDate);
  };

  const callUpdate = async () => {
    if (!editingItem) return;

    const updatedItem: DataItem = {
      ...editingItem,
      titel: title,
      discription: description,
      setDate: startDate,
      endDate: endDate,
    };

    try {
      const response = await fetch(`https://localhost:44315/api/Todos?id=${editingItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      });

      if (response.ok) {
        console.log('Data updated successfully');
        alert("updated")
        // Fetch todos again to update the list after updating
        fetchData();
        setEditingItem(null); // Clear the editing state
         setTitle('');
        setDescription('');
        setStartDate('');
        setEndDate('');
      } else {
        console.error('Failed to update data');
        alert("Not updated")
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  // }

  return (
    <>

    <section className='add-data-section'>
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
            <button type="button" className="btn-update btn btn-warning" onClick={() => callUpdate()}>Update Todo</button>
          </div>
        </div>
      </form>
    </div>
    </section>

<section className='view-data-section'>
    <div className="container">
      <h1>Available Todos</h1>
      <table className="data-table table table-success table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Set Date</th>
            <th>End Date</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.titel}</td>
              <td>{item.discription}</td>
              <td>{item.setDate.split("T")[0]}</td>
              <td>{item.endDate.split( "T" )[0]}</td>
              <td>
                <button type="button" className="btn-edit btn btn-primary" onClick={() =>handleUpdate(item)} >Update</button>
                <button type="button" className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
</section>
</>
  );
};

export default ApiData;
