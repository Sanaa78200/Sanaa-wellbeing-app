
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-islamic-pattern">
      <div className="text-center islamic-border p-10 max-w-md">
        <h1 className="text-4xl font-bold mb-4 text-islamic-green-dark">404</h1>
        <p className="text-xl text-islamic-slate mb-6">Oups ! Page non trouvée</p>
        <p className="text-islamic-slate mb-8">La page que vous recherchez n'existe pas ou a été déplacée.</p>
        <Button className="bg-islamic-green hover:bg-islamic-green-dark text-white" asChild>
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Retour à l'accueil
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
