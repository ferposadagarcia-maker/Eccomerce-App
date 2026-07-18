import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signupService } from '../services/auth.service';
import { mapAuthError } from '../services/authError.service';

export const SignupPage = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Validación básica antes de enviar peticiones a Firebase
        if (password !== confirmPassword) {
            setError('Las contraseñas ingresadas no coinciden.');
            return;
        }

        setIsLoading(true);

        try {
            // Registra el usuario en Firebase Auth e inyecta el rol 'customer' en Firestore
            await signupService(email, password);

            alert('¡Cuenta creada con éxito!');
            navigate('/', { replace: true });
        } catch (err: any) {
            setError(mapAuthError(err.code));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-page-container">
            <article className="auth-box">
                <h2>Crear Cuenta</h2>

                {error && <div className="form-error-alert">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
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

                    <div className="form-group">
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

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            required
                            placeholder="Repite la contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn-jewelry-primary"
                        style={{ marginTop: '1.5rem', width: '100%' }}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Registrando...' : 'Registrarse'}
                    </button>
                </form>

                <p style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: 'var(--muted)', textAlign: 'center' }}>
                    ¿Ya tienes una cuenta activa?{' '}
                    <Link to="/login" style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>
                        Inicia Sesión
                    </Link>
                </p>
            </article>
        </div>
    );
};