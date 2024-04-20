import { createContext } from "react";
import { AuthContextType } from "../interfaces/auth.interface";

export const AuthContext = createContext<AuthContextType | null>(null);