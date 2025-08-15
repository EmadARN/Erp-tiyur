
import React from "react";
import type { RouteObject } from "react-router-dom";
import LandingPage from "./LandingPage";



export const LandingRoute: RouteObject[] = [
  {
    path: "/",
    element: React.createElement(LandingPage),
    
    
  },
];
