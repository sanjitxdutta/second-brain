import Navbar from "../components/Navbar";
import NotesSection from "../components/NotesSection";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Main content area */}
      <main className="flex-1 md:ml-64 p-4">
        <NotesSection />
      </main>
    </div>
  );
}
