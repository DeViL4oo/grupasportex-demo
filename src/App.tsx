import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Laser from "./pages/Laser";
import Bending from "./pages/Bending";
import Welding from "./pages/Welding";
import Coating from "./pages/Coating";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

/**
 * Brak React.lazy — wszystkie podstrony są prerenderowane do statycznego HTML
 * (scripts/prerender.mjs), więc kod i treść trafiają do przeglądarki w pierwszym
 * żądaniu, a nawigacja działa natychmiast po hydratacji.
 */
export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/o-firmie" element={<About />} />
        <Route path="/ciecie-laserowe" element={<Laser />} />
        <Route path="/giecie-blach-cnc" element={<Bending />} />
        <Route path="/spawanie-konstrukcji-stalowych" element={<Welding />} />
        <Route path="/lakierowanie-proszkowe" element={<Coating />} />
        <Route path="/realizacje" element={<Projects />} />
        <Route path="/kontakt" element={<Contact />} />
        <Route path="/polityka-prywatnosci" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
