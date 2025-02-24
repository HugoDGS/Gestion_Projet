import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Projects() {
  const [projects, setProjects] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Si aucun token, rediriger vers la page de login
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      // Si le token est présent, récupérer les projets
      axios
        .get("http://localhost:3000/projects", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setProjects(res.data))
        .catch((err) => {
          console.error(err);
          alert("Veuillez vous reconnecter !");
        });
    }
  }, [token, navigate]);

  // Fonction de déconnexion
  const handleLogout = () => {
    localStorage.removeItem("token"); // Supprimer le token
    navigate("/login"); // Rediriger vers la page de connexion
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mes Projets</h1>
      <button onClick={handleLogout} className="bg-red-500 text-white p-2 mb-4">
        Se déconnecter
      </button>

      {projects.length > 0 ? (
        <ul className="space-y-2">
          {projects.map((project) => (
            <li key={project.id} className="border p-2">
              <h2 className="text-lg font-semibold">{project.name}</h2>
              <p>{project.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun projet trouvé.</p>
      )}
    </div>
  );
}

export default Projects;
