import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined || context === null) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}