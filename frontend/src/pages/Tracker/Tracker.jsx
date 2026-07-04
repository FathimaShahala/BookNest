import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import TrackerHeader from "../../components/Tracker/TrackerHeader";
import TrackerStats from "../../components/Tracker/TrackerStats";
import ReadingEntryTable from "../../components/Tracker/ReadingEntryTable";

import ReadingHeatmap from "../../components/ReadingHeatmap/ReadingHeatmap";
import AddReadingEntryModal from "../../components/Tracker/AddReadingEntryModal";
import { getReadingSessions } from "../../services/trackerService";

import "./Tracker.css";

function Tracker() {
  const [sessions, setSessions] = useState([]);

  const [stats, setStats] = useState({
    totalEntries: 0,
    totalPages: 0,
    totalMinutes: 0,
    dailyAverage: 0,
  });

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    loadTracker();
  }, []);

  const loadTracker = async () => {
    try {
      const data = await getReadingSessions(user.token);

      setSessions(data);

      const totalEntries = data.length;

      const totalPages = data.reduce(
        (sum, item) => sum + item.pagesRead,

        0,
      );

      const totalMinutes = data.reduce(
        (sum, item) => sum + item.minutesRead,

        0,
      );

      const dailyAverage =
        totalEntries === 0 ? 0 : Math.round(totalPages / totalEntries);

      setStats({
        totalEntries,

        totalPages,

        totalMinutes,

        dailyAverage,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>
      <div className="tracker-page">
        <TrackerHeader onAdd={() => setOpenModal(true)} />
        <TrackerStats stats={stats} />

        <ReadingEntryTable />

        <ReadingHeatmap />
      </div>
      <AddReadingEntryModal

open={openModal}

onClose={()=>

setOpenModal(false)

}

onSave={loadTracker}

/>
    </DashboardLayout>
  );
}

export default Tracker;
