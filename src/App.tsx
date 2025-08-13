import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import { ScrollToTop } from "./modules/shared/helpers/ScrollToTop";
import { Toaster } from 'react-hot-toast';
const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRoutes />
      <Toaster position="top-center" />
    </BrowserRouter>
  );
};

export default App;
