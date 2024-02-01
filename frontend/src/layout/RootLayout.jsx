import React from "react";
import { Outlet } from "react-router-dom";
// import { useCurrentUserContext } from "../contexte/CurrentUserContext";
import "./reset.css";

function RootLayout() {
  return (
    <div>
      <header>
        <ul>
          <li>Appartements</li>
          <li>Maison</li>
          <li>Studio</li>
          <li>Vacances</li>
        </ul>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
