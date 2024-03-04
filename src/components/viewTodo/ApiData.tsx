// ApiData.tsx
import React, { useState, useEffect } from 'react';
import './apiData.css';
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


  return (
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
            <button type="button" className="btn-edit btn btn-primary">Edit</button>
            <button type="button" className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
};

export default ApiData;
