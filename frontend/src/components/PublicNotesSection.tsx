import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "./Card";
import { shareApi } from "../api/shareApi";

interface Note {
  _id: string;
  type: string;
  title: string;
  link: string;
  tags?: string;
  createdAt: string;
}

interface PublicNotesSectionProps {
  selected: string;
}

const PublicNotesSection: React.FC<PublicNotesSectionProps> = ({ selected }) => {
  const { shareId } = useParams();
  const [notes, setNotes] = useState<Note[]>([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (shareId) {
      shareApi.fetchSharedBrain(shareId)
        .then((data) => {
          if (data?.content && Array.isArray(data.content)) {
            setNotes(data.content);
            setUsername(data.username || "Unknown User"); // store username
          } else {
            setNotes([]);
            setUsername("");
          }
        })
        .catch((err) => {
          console.error("Failed to fetch shared brain:", err);
          setNotes([]);
          setUsername("");
        });
    }
  }, [shareId]);

  const filteredNotes = selected
    ? notes.filter((note) => note.type?.toLowerCase() === selected.toLowerCase())
    : notes;

  return (
    <div className="px-4 md:px-8 py-4">
      <div className="md:hidden mb-4">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Second Brain Logo" className="w-6 h-6" />
          <span className="text-xl font-bold text-gray-800">Second Brain</span>
        </div>
        <h2 className="text-lg font-bold mt-3">
          Shared Brain by <span className="text-purple-600">{username}</span>
        </h2>
      </div>

      <div className="hidden md:flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">
          Shared Brain by <span className="text-purple-600">{username}</span>
        </h2>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <Card
              key={note._id}
              title={note.title}
              type={note.type}
              link={note.link}
              tags={note.tags ? note.tags.split(",").map((tag) => tag.trim()) : []}
              dateAdded={note.createdAt}
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No notes found in this shared brain.
          </p>
        )}
      </div>
    </div>
  );
};

export default PublicNotesSection;
