import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";
import InvoicePage from "./pages/InvoicePage";
import PdfPage from "./pages/PdfPage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
      <div className="main h-full">
        <nav className="bg-gray-800">
          <div className="container mx-auto p-2">
            <Link to="/"><h2 className="text-white text-2xl font-bold">Ken-Tech Maintenance</h2></Link>
          </div>
        </nav>
        <div className="container mx-auto p-2 h-full">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="create" element={<CreatePage/>} />
          <Route path="edit/:id" element={<EditPage/>} />
          <Route path="invoice" element={<InvoicePage/>} />
          <Route path="generatePdf" element={<PdfPage/>} />
        </Routes>
        </div>
        <ToastContainer />
      </div>
  );
}

export default App;
