
import './App.css';
// eslint-disable-next-line

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HalamanUtama from './Pages/HalamanUtama';
import Login from './Pages/Login';
import Result from './Pages/Result';
import InputDataForm from'./Pages/InputDataForm';
import Penilaian from './Pages/Penilaian';
import History from './Pages/History';
import DataAnak from './Pages/DataAnak';
import EditDataForm from './Pages/EditAnak';
import DataNilai from './Pages/DataNilai';
import EditNilaiForm from './Pages/EditNilai';
import ResultHistory from './Pages/ResultHistory';

const router = createBrowserRouter([
  {
    path: "/",
    element:<HalamanUtama /> //rute ke halaman utama
  },
  {
    path: "/Login",
    element:<Login /> // rute ke halaman login
  },
  {
    path: "/Result/:id_anak",
    element:<Result /> // rute ke halaman hasil
  },
  {
    path: "/InputDataForm",
    element:<InputDataForm />
  },

  {
    path: "/InputDataForm",
    element: <InputDataForm />
  },

  {
    path: "/penilaian/:id_anak", // Tambahkan rute untuk halaman penilaian
    element: <Penilaian />,
  },
  {
    path: "/History", // Tambahkan rute untuk halaman penilaian
    element: <History />,
  },
  {
    path: "/dataanak", // Tambahkan rute untuk halaman penilaian
    element: <DataAnak />,
  },
  {
    path: "/edit-anak/:id_anak", // Tambahkan rute untuk halaman penilaian
    element: <EditDataForm />,
  },
  
  {
    path: "/edit-nilai/:id_anak", // Tambahkan rute untuk halaman penilaian
    element: <EditNilaiForm />,
  },
  {
    path: "/datanilai", // Tambahkan rute untuk halaman penilaian
    element: <DataNilai />,
  },
  {
    path: "/ResultHistory/:id_anak",
    element:<ResultHistory /> // rute ke halaman hasil
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  )

    
  
}

export default App;
