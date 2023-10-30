import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListaUsuarios from "./usuarios/ListaUsuarios";
import Navegacion from "./plantilla/navegacion";
import AddUser from "./usuarios/AddUser";
import EditUser from "./usuarios/editUser";
import EditReservation from "./reservations/editReservation";
import AddReservation from "./reservations/AddReservation";
import ListReservation from "./reservations/ListReservation";
import MonthlyReservationSummary from "./reservations/MonthlySummary";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Navegacion />
        <Routes>
          <Route exact path='/' element={<ListaUsuarios />} />
          <Route exact path='/add' element={<AddUser />} />
          <Route exact path='/edit/:idUsuario' element={<EditUser/>}/>
          <Route exact path='/editReservation/:idReservation' element={<EditReservation/>}/>
          <Route exact path='/addReser' element={<AddReservation/>} />
          <Route exact path='/reservat' element={<ListReservation/>}/>
          <Route exact path='/monthlySummary' element={<MonthlyReservationSummary/>}/> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
