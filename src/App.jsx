import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import WeatherComponent from "./components/WeatherComponent";

function App() {
  return (
    <>
      <div className="flex min-h-screen flex-col bg-white dark:bg-neutral-900">
        <Navbar />
        <main className="mt-10 flex-1">
          <WeatherComponent />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
