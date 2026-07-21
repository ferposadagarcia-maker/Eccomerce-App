import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { mapAuthError } from '../services/authError.service';
import googleLogo from '../assets/googleLogo.png'; // Asegúrate de tener tu logo en src/assets/

export const LoginPage = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const { login, signinWithGoogle } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await login(email, password);
            navigate('/', { replace: true });
        } catch (err: any) {
            setError(mapAuthError(err.code));
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignin = async () => {
        setError(null);
        setLoading(true);
        try {
            await signinWithGoogle();
            navigate('/', { replace: true });
        } catch (err: any) {
            setError(mapAuthError(err.code));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <article className="auth-card">
                <h2>Ingresar</h2>
                <p className="subtitle">¡Nos alegra tenerte de vuelta!</p>

                {error && <div className="form-error-alert">{error}</div>}

                <button onClick={handleGoogleSignin} className="google-btn" disabled={loading}>
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
                            disabled={loading}
                        />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            id="password"
                            type="password"
                            required
                            placeholder="contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    <button type="submit"
                        className="btn-submit"
                        disabled={loading}>
                        {loading ? 'Verificando...' : 'Iniciar Sesión'}
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