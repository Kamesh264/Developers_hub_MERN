// import React from 'react';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Home from './Home';
// import Login from './Login';
// import Register from './Register';
// import Dashboard from './Dashboard';
// import Myprofile from './Myprofile';
// import Indprofile from './Indprofile';

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/myprofile" element={<Myprofile />} />
//         <Route path="/indprofile/:fullname/:email/:skill/:id" element={<Indprofile/>} />
//       </Routes>
//       </BrowserRouter>
//   );
// }

// export default App;
import React from 'react';
import {Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import Myprofile from './Myprofile';
import Indprofile from './Indprofile';


const App = () => {
  return (
    
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/myprofile" element={<Myprofile/>} />
        <Route path="/indprofile/:fullname/:email/:skill/:id" element={<Indprofile/>} />
      </Routes>
  );
}

export default App;
