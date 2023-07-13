// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
import "bootstrap/dist/css/bootstrap.min.css";
import Users from "./Users";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateUser from "./CreateUser";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./redux/userSlice";
import UpdateUser from "./UpdateUser";
import ShowUser from "./showUser";
function App() {
    
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001");
        dispatch(getUser(response.data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Users />}></Route>
        <Route path="/create" element={<CreateUser />}></Route>
        <Route path="/edit/:id" element={<UpdateUser />}></Route>
        <Route path="/read/:id" element={<ShowUser />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
