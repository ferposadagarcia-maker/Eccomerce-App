export const mapAuthError = (code: string) => {
    switch (code) {
        case "auth/invalid-email":
        case "auth/wrong-password":
        case "auth/user-not-found":
            return "El correo electrónico o la contraseña son incorrectos. Por favor, intenta nuevamente.";

        case "auth/too-many-requests":
            return "Demasiados intentos fallidos. Por favor, intenta nuevamente en unos minutos";

        case "auth/email-already-in-use":
            return "Este correo electrónico ya está registrado. Usa otra dirección o intenta iniciar sesión";

        case "auth/weak-password":
            return "La contraseña es demasiado débil. Por favor, elige una contraseña más segura.";

        default:
            return "Ocurrió un error inesperado. Por favor, intenta mas tarde.";
    }
};