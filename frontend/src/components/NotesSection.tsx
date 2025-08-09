import { FaShareAlt, FaPlus } from "react-icons/fa";
import { Button } from "./Button";
import Card from "./Card";

const NotesSection = () => {
  const notes = [
    {
      title: "Project Ideas",
      subtitle: "Notes",
      link: "https://sanjitxdutta.vercel.app/",
      tags: ["productivity", "ideas"],
      dateAdded: "2024-03-10",
    },
    {
      title: "How to Build a Second Brain",
      subtitle: "Video",
      link: "https://sanjitxdutta.vercel.app/",
      tags: ["productivity", "learning"],
      dateAdded: "2024-03-09",
    },
    {
      title: "Productivity Tip",
      subtitle: "Article",
      link: "https://sanjitxdutta.vercel.app/",
      tags: ["productivity", "learning"],
      dateAdded: "2024-03-08",
    },
  ];

  return (
    <div className="px-4 md:px-8 py-4">

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
          />
        </div>
      </div>

      {/* Mobile Buttons */}
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
        />
      </div>
      {/* Cards */}
      {/* Cards */}
<div className="grid gap-4 grid-cols-1 md:grid-cols-4">
  {notes.map((note, idx) => (
    <Card
      key={idx}
      title={note.title}
      subtitle={note.subtitle}
      link={note.link}
      tags={note.tags}
      dateAdded={note.dateAdded}
      onDelete={() => console.log(`Delete card ${idx}`)} // Optional
    />
  ))}
</div>



    </div >
  );
};

export default NotesSection;
