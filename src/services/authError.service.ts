export const mapAuthError = (code: string): string => {
    switch (code) {
        case 'auth/invalid-credential':
        case 'auth/wrong-password':
            return 'La contraseña ingresada es incorrecta. Por favor, verifíquela e intente nuevamente.';
        case 'auth/user-not-found':
            return 'No se encontró ninguna cuenta registrada con este correo electrónico.';
        case 'auth/email-already-in-use':
            return 'Este correo electrónico ya se encuentra registrado en nuestro sistema.';
        case 'auth/weak-password':
            return 'Por motivos de seguridad, la contraseña debe contener al menos 6 caracteres.';
        case 'auth/invalid-email':
            return 'El formato del correo electrónico ingresado no es válido.';
        case 'auth/too-many-requests':
            return 'Su acceso ha sido bloqueado temporalmente debido a demasiados intentos fallidos.';
        case 'auth/user-disabled':
            return 'Esta cuenta de usuario ha sido inhabilitada por el administrador.';
        default:
            return 'Ocurrió un inconveniente inesperado en el servidor de autenticación. Intente más tarde.';
    }
};