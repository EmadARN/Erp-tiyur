import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import { Toaster } from 'react-hot-toast';
const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
      <Toaster position="top-center" />
    </BrowserRouter>
  );
};

export default App;
