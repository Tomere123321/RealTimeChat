import { Routes, Route, Navigate } from 'react-router-dom'; 
import './App.css';
import Home from './Pages/Home';
import Login from './Pages/LogIn';
import SignUp from './Pages/SignUp';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './Context/AuthContext';


function App() {
  const { authUser } = useAuthContext();
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
      <Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
				<Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
				<Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
      </Routes>
      <Toaster/>
    </div>
  );
}

export default App;
