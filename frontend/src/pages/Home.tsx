import { FaShareAlt, FaPlus } from "react-icons/fa";
import Card from "../components/Card";

export default function App() {
  return (
    <div className="p-6">
      <Card
        title="How to Build a Second Brain"
        subtitle="YouTube Video"
        link="https://sanjitxdutta.vercel.app/"
        tags={["productivity", "learning"]}
        dateAdded="2024-09-03"
        onDelete={() => console.log("Deleted")}
      />
    </div>
  );
}
