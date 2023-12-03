import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WeatherComponent from "./components/WeatherComponent";

function App() {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <WeatherComponent />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
