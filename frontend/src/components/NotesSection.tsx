import { FaShareAlt, FaPlus, FaSignOutAlt } from "react-icons/fa";
import { Button } from "./Button";
import Card from "./Card";
import CreateContentModal from "./CreateContentModal";
import { useState, useEffect } from "react";
import { contentApi } from "../api/contentApi";
import { useAuth } from "../context/AuthContext";
import ShareModal from "./ShareModal";
import { shareApi } from "../api/shareApi";
import { toast } from "react-toastify";

interface Note {
  _id: string;
  type: string;
  title: string;
  link: string;
  tags?: string;
  createdAt: string;
}

interface NotesSectionProps {
  selected: string;
}

type CreateNoteData = Omit<Note, "_id" | "createdAt">;

const NotesSection: React.FC<NotesSectionProps> = ({ selected }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const { token, logout } = useAuth();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareLink, setShareLink] = useState("");

  const fetchNotes = async () => {
    try {
      const res = await contentApi.getNotes(token)

      if (res.success && Array.isArray(res.data)) {
        setNotes(res.data);
      } else {
        setNotes([]);
      }
    } catch (err) {
      console.error("Failed to fetch notes", err);
      toast.error("Failed to load notes. Please try again.");
      setNotes([]);
    }
  };

  useEffect(() => {
    if (token) {
      setTimeout(() => {
        fetchNotes();
      }, 200);
    }
  }, [token]);

  const handleCreateNote = async (formData: CreateNoteData) => {
    try {
      const res = await contentApi.addNote(formData, token);
      if (res.success) {
        await fetchNotes();
        setIsModalOpen(false);
        toast.success("Note added successfully!");
      }
    } catch (err) {
      console.error("Failed to add note", err);
      toast.error("Failed to add note. Please try again.");
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      const res = await contentApi.deleteNote(token, id);
      if (res.success) {
        setNotes((prev) => prev.filter((n) => n._id !== id));
        toast.success("Note deleted successfully!");
      }
    } catch (err) {
      console.error("Failed to delete note", err);
      toast.error("Failed to delete note. Please try again.");
    }
  };

  const handleShareBrain = async () => {
    try {
      const res = await shareApi.toggleShare(token, true);
      if (res.success && res.link) {
        const shareId = res.link.split("/").pop();
        const frontendLink = `${window.location.origin}/share/${shareId}`;

        setShareLink(frontendLink);
        setIsShareModalOpen(true);
        toast.success("Brain shared successfully!");
      }
    } catch (err) {
      console.error("Error sharing brain:", err);
      toast.error("Error sharing brain. Please try again.");
    }
  };

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
        <h2 className="text-lg font-bold mt-3">All Notes</h2>
      </div>

      <div className="hidden md:flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">All Notes</h2>
        <div className="flex gap-3 items-center">
          <Button
            variant="secondary"
            size="md"
            text="Log out"
            startIcon={<FaSignOutAlt />}
            onClick={logout}
          />
          <Button
            variant="secondary"
            size="md"
            text="Share Brain"
            startIcon={<FaShareAlt />}
            onClick={handleShareBrain}
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
          text="Log out"
          startIcon={<FaSignOutAlt />}
          onClick={logout}
        />
        <Button
          variant="secondary"
          size="sm"
          text="Share Brain"
          startIcon={<FaShareAlt />}
          onClick={handleShareBrain}
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
        {notes.length > 0 ? (
          filteredNotes.map((note) => (
            <Card
              key={note._id}
              title={note.title}
              type={note.type}
              link={note.link}
              tags={note.tags ? note.tags.split(",").map((tag) => tag.trim()) : []}
              dateAdded={note.createdAt}
              onDelete={() => handleDeleteNote(note._id)}
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No notes yet. Click "Add Content" to create one.
          </p>
        )}
      </div>

      <CreateContentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateNote}
      />

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        link={shareLink}
      />
    </div>
  );
};

export default NotesSection;
