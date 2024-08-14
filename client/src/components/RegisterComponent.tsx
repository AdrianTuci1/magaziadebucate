import React, { useState } from 'react';
import '../styles/inregistrare.scss'

interface RegisterFormProps {
  onSubmit: (values: { username: string; email: string; password: string; confirmPassword?: string }) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(''); // State for password error message

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match. Please try again.');
      return; // Prevent form submission if passwords don't match
    }

    onSubmit({ username, email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <div className="reg-wrapper">
        <h2>INREGISTRARE</h2>
      <div className="form-group">
        <label htmlFor="username">NUME UTILIZATOR:</label>
        <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="email">EMAIL:</label>
        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <p className="form-text ulu">Nu vom distribui email-ul altor persoane</p>
      </div>
      <div className="form-group">
        <label htmlFor="password">PAROLA:</label>
        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword">CONFIRMA PAROLA:</label>
        <input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        {passwordError && <p className="form-text error">{passwordError}</p>}
      </div>
      <button type="submit" className='btn-inregistrare'>INREGISTRARE</button>
      </div>
    </form>

  );
};

export default RegisterForm;
