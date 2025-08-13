import { useState } from "react";
import Navbar from "../components/Navbar";
import PublicNotesSection from "../components/PublicNotesSection";

export default function PublicDashboard() {
  const [selected, setSelected] = useState<string>("");

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navbar selected={selected} setSelected={setSelected} />
      <main className="flex-1 md:ml-64 p-4">
        <PublicNotesSection selected={selected} />
      </main>
    </div>
  );
}
