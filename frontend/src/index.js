import React,{ useState, useEffect }  from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Navbar from "./components/navBar";
import LoginPage  from "./pages/loginPage"
import RegisterPage from "./pages/registerPage";
import HomePage from "./pages/homePage";

const App = () => {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 360000,
        refetchInterval: 360000,
        refetchOnWindowFocus: false
      },
    },
  });
  

  const [sessionId, setSessionId] = useState(() => sessionStorage.getItem('sessionId') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionId);

  useEffect(() => {
    if (sessionId) {
      setIsAuthenticated(true);
    }
  }, [sessionId]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/login" element={ <LoginPage /> } />
          <Route path="/register" element={ <RegisterPage /> }/>
          <Route path="/home" element={ <HomePage />}/>
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};


const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);