import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Bienvenue sur l'application</h1>
      <Link to="/login" className="text-blue-500 text-lg">
        Cliquez ici pour vous connecter
      </Link>
    </div>
  );
}

export default Home;
