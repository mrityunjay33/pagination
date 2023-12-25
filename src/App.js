import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [values, setValues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchData = async () => {
    try {
      const res = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
      const data = await res.json();
      // console.log(data)
      setValues(data);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  useEffect(() =>{
    fetchData();
  },[]);

  const pagination = (index) => {
    setCurrentPage(index);
  }
  
  const handleNext = () => {
    const count = Math.ceil(values.length/itemsPerPage);
    if(currentPage < count) setCurrentPage(prev => prev + 1);
  }
  const handlePrev = () => {
    if(currentPage > 1) setCurrentPage(prev => prev - 1);
  }

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentData = values.slice(firstIndex, lastIndex);

  return (
    <div>
      <h1>Employee Data Table</h1>
      <table style={{width:'100%'}}>
        <tr style={{background:'#D6EEEE'}}>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
        {currentData.map((value, idx)=><tr key={idx}>
          <td>{value.id}</td>
          <td>{value.name}</td>
          <td>{value.email}</td>
          <td>{value.role}</td>
        </tr>)}
      </table>
      
      <ul className='pagination'>
      <button onClick={handlePrev}>Prev</button>
        {Array.from({length: Math.ceil(values.length/itemsPerPage)}, (_, i) => 
        <li onClick={() => pagination(i+1)} className={currentPage === i+1 ? 'active' : ''}>{i+1}</li>
        )}
      <button onClick={handleNext}>Next</button>
      </ul>
    </div>
  );
}

export default App;