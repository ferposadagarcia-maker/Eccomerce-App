import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { mapAuthError } from '../services/authError.service';
import googleLogo from '../assets/googleLogo.png';

export const SignupPage = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const { signup, signinWithGoogle } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError('Las contraseñas ingresadas no coinciden.');
            return;
        }

        setIsLoading(true);

        try {
            await signup(email, password);
            alert('¡Cuenta de joyería creada con éxito!');
            navigate('/', { replace: true });
        } catch (err: any) {
            setError(mapAuthError(err.code));
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignup = async () => {
        setError(null);
        setIsLoading(true);
        try {
            await signinWithGoogle();
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
                <h2>Registrarse</h2>
                <p className="subtitle">¡Únete hoy mismo a nuestra comunidad!</p>

                {error && <div className="form-error-alert">{error}</div>}

                <button onClick={handleGoogleSignup} className="google-btn" disabled={isLoading}>
                    <img src={googleLogo} alt="Google" />
                    Registrarse con Google
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
                            placeholder="Mínimo 6 caracteres"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            required
                            placeholder="Repite tu contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>

                    <button type="submit" className="btn-submit" disabled={isLoading}>
                        {isLoading ? 'Registrando...' : 'Registrarse'}
                    </button>
                </form>

                <p className="auth-footer-text">
                    ¿Ya eres miembro?
                    <Link to="/login">Inicia Sesión</Link>
                </p>
            </article>
        </div>
    );
};