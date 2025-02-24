import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/auth/signin", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token); // Stocke le token
      navigate("/projects"); // Redirige vers les projets après connexion réussie
    } catch (error) {
      alert("Erreur de connexion !");
    }
  };

  // Si un token est présent, redirige automatiquement vers /projects
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/projects"); // Si déjà connecté, rediriger vers la page des projets
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-400">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Se connecter</h2>
        
        <form onSubmit={handleLogin}>
          {/* Email input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Entrez votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password input */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-600 font-medium mb-2">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Entrez votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            Se connecter
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">Vous n'avez pas de compte ? <a href="/register" className="text-blue-600">Inscrivez-vous</a></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
