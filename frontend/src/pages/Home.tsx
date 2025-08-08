import { FaShareAlt, FaPlus } from "react-icons/fa";
import { Button } from "../components/Button";

export default function App() {
  return (
    <div className="p-6 space-y-4">
      <Button
        variant="primary"
        size="sm"
        text="Add Content"
        startIcon={<FaPlus />}
        onClick={() => console.log("Add clicked")}
      />

      <Button
        variant="secondary"
        size="sm"
        text="Next Step"
        startIcon={<FaShareAlt />} 
      />
    </div>
  );
}
