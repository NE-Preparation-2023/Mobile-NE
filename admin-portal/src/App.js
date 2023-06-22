import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard/dashbaord';
import Login from './pages/Login/login';
import AddEmployee from './pages/AddEmployee';
import { ProtectedRoute, PublicRouteChecker } from './components/ProtectedRoute';

function App() {
  const roles = ['admin', 'user']
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<ProtectedRoute role='admin' element={Dashboard} />} />
        <Route path='/' element={<PublicRouteChecker roles={roles} element={Login} />} />
        <Route path="/addEmployee" element={<ProtectedRoute role="admin" element={AddEmployee} />} />
        <Route path='/' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/addEmployee' element={<AddEmployee/>}/>
        {/* <Route path='/addVehicle' element={<ProtectedRoute role='admin' element={AddVehicle} />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
