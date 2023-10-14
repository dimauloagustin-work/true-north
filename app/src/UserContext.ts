import React from "react";

const UserContext = React.createContext<{
  isLogged: boolean;
  login: () => void;
  logout: () => void;
} | null>(null);

export { UserContext };
