import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import { ScrollToTop } from "./modules/shared/helpers/ScrollToTop";
import { useThemeSettings } from "./modules/shared/hooks/useThemeSettings";
import { useEffect } from "react";

const App = () => {
  const { fontSize } = useThemeSettings();

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--app-font-size",
      `${fontSize}px`
    );
  }, [fontSize]);
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
