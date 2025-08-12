import { FaShareAlt, FaPlus } from "react-icons/fa";
import { Button } from "./Button";
import Card from "./Card";
import CreateContentModal from "./CreateContentModal";
import { useState } from "react";

const NotesSection = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [notes, setNotes] = useState([
  {
    title: "Project Ideas",
    subtitle: "Notes",
    link: "https://sanjitxdutta.vercel.app/",
    tags: ["productivity", "ideas"],
    dateAdded: "2024-03-10",
  },
  // ... other initial notes
]);

  return (
    <div className="px-4 md:px-8 py-4">

      <CreateContentModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  onSubmit={(formData) => {
    const newNote = {
      ...formData,
      dateAdded: new Date().toISOString().split("T")[0], // today's date
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]); // Add new note to top
    setIsModalOpen(false);
  }}
/>

      <div className="md:hidden mb-4">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Second Brain Logo" className="w-6 h-6" />
          <span className="text-xl font-bold text-gray-800">Second Brain</span>
        </div>
        <h2 className="text-lg font-bold mt-3">All Notes</h2>
      </div>

      <div className="hidden md:flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">All Notes</h2>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            size="md"
            text="Share Brain"
            startIcon={<FaShareAlt />}
          />
          <Button
            variant="primary"
            size="md"
            text="Add Content"
            startIcon={<FaPlus />}
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      </div>

      <div className="md:hidden flex gap-3 mb-4 w-full">
        <Button
          variant="secondary"
          size="sm"
          text="Share Brain"
          startIcon={<FaShareAlt />}
        />
        <Button
          variant="primary"
          size="sm"
          text="Add Content"
          startIcon={<FaPlus />}
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
        {notes.map((note, idx) => (
          <Card
            key={idx}
            title={note.title}
            subtitle={note.subtitle}
            link={note.link}
            tags={note.tags}
            dateAdded={note.dateAdded}
            onDelete={() => console.log(`Delete card ${idx}`)}
          />
        ))}
      </div>



    </div >
  );
};

export default NotesSection;
