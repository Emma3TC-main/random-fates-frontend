// Hook que centraliza la navegación de los botones de inicio, registro y juegos,
// redirigiendo según si hay un usuario autenticado o no. 
// Principalmente hecho por la repetición de esta lógica en Home.js y About.js, y para mantener el código más limpio.

import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthUser } from "../services/authService";

export default function useStartNow() {
    const navigate = useNavigate();

    const handleStartNow = useCallback(() => {
        const authUser = getAuthUser();
        if (authUser) {
            navigate("/dashboard");
        } else {
            navigate("/register");
        }
    }, [navigate]);

    const handleCreateAccount = useCallback(() => {
        const authUser = getAuthUser();
        if (authUser) {
            alert("Ya hay una sesión iniciada");
        } else {
            navigate("/register");
        }
    }, [navigate]);

    const handleTryGames = useCallback(() => {
        const authUser = getAuthUser();
        if (authUser) {
            navigate("/games");
        } else {
            navigate("/register");
        }
    }, [navigate]);

    return { handleStartNow, handleCreateAccount, handleTryGames };
}
