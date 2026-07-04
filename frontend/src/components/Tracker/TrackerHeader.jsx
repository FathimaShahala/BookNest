import { FaPlus, FaChartLine } from "react-icons/fa";
import "./TrackerHeader.css";

function TrackerHeader({ onAdd }) {
  return (
    <div className="tracker-header">
      <div className="tracker-title">
        <div className="tracker-icon">
          <FaChartLine />
        </div>

        <div>
          <h1>Reading Tracker</h1>

          <p>Track your daily reading progress and build your reading habit.</p>
        </div>
      </div>

      <button className="tracker-add-btn" onClick={onAdd}>
        <FaPlus />

        <span>Add Reading Entry</span>
      </button>
    </div>
  );
}

export default TrackerHeader;
