// src/pages/LoginPage.tsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginService, singinWithGoogleService } from '../services/auth.service';
import { mapAuthError } from '../services/authError.service';
import googleLogo from '../assets/googleLogo.png'; // Asegúrate de tener tu logo en src/assets/

export const LoginPage = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            await loginService(email, password);
            navigate('/', { replace: true });
        } catch (err: any) {
            setError(mapAuthError(err.code));
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError(null);
        setIsLoading(true);
        try {
            await singinWithGoogleService();
            navigate('/', { replace: true });
        } catch (err: any) {
            setError(mapAuthError(err.code));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <article className="auth-card">
                <h2>Ingresar</h2>
                <p className="subtitle">¡Nos alegra tenerte de vuelta!</p>

                {error && <div className="form-error-alert">{error}</div>}

                <button onClick={handleGoogleLogin} className="google-btn" disabled={isLoading}>
                    <img src={googleLogo} alt="Google" />
                    Usar cuenta de Google
                </button>

                <div className="auth-divider">o</div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="auth-field">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input
                            id="email"
                            type="email"
                            required
                            placeholder="correo@ejemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            id="password"
                            type="password"
                            required
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>

                    <button type="submit" className="btn-submit" disabled={isLoading}>
                        {isLoading ? 'Verificando...' : 'Iniciar Sesión'}
                    </button>
                </form>

                <p className="auth-footer-text">
                    ¿Aún no tienes cuenta?
                    <Link to="/signup">Regístrate aquí</Link>
                </p>
            </article>
        </div>
    );
};