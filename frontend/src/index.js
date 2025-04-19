import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Navbar from "./components/navBar";
import Footer from "./components/footer";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import HomePage from "./pages/homePage";
import MatchesPage from "./pages/matchesPage";
import CreateTeamPage from "./pages/createTeamPage";
import CreateLeaguePage from "./pages/createLeaguePage";
import MatchDetailPage from "./pages/matchDetailPage";
import LeaguesPage from "./pages/leaguesPage";
import LeagueDetailsPage from "./pages/leagueDetailPage";
import ProfilePage from "./pages/profilePage";
import TeamDetailPage from "./pages/teamDetailPage";
import ScheduleMatchPage from "./pages/scheduleMatchPage";
import TeamsPage from "./pages/teamPage";
import MyOrganizationsPage from "./pages/myOrganizationsPage";

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 360000,
        refetchInterval: 360000,
        refetchOnWindowFocus: false,
      },
    },
  });

  // Use sessionStorage to get the 'authToken' if available
  const [sessionId, setSessionId] = useState(() => sessionStorage.getItem('authToken') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionId); // Check if sessionId exists

  // Update isAuthenticated when sessionId changes
  useEffect(() => {
    if (sessionId) {
      setIsAuthenticated(true);  // If sessionId exists, set as authenticated
    } else {
      setIsAuthenticated(false);  // Otherwise, set as unauthenticated
    }
  }, [sessionId]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navbar isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/matches" element={<MatchesPage />} />
          <Route path="/create-team" element={<CreateTeamPage />} />
          <Route path="/create-league" element={<CreateLeaguePage />} />
          <Route path="/match" element={<MatchDetailPage />} />
          <Route path="/leagues" element={<LeaguesPage />} />
          <Route path="/leagues/:id" element={<LeagueDetailsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/teams/:id" element={<TeamDetailPage />} />
          <Route path="/schedule-match" element={<ScheduleMatchPage />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/my-organization" element={<MyOrganizationsPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);
