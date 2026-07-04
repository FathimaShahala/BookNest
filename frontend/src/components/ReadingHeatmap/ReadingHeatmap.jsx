import {
  useEffect,
  useState,
} from "react";

import {
  useAuth,
} from "../../context/AuthContext";

import {
  getHeatmap,
} from "../../services/heatmapService";

import "./ReadingHeatmap.css";

function ReadingHeatmap() {

  const { user } =
    useAuth();

  const [heatmap,
    setHeatmap] =
    useState([]);

  useEffect(() => {

    loadHeatmap();

  }, []);

  const loadHeatmap =
    async () => {

      try {

        const data =
          await getHeatmap(
            user.token
          );

        generateCalendar(
          data
        );

      } catch (error) {

        console.log(error);

      }

    };

  const generateCalendar =
    (records) => {

      const map = {};

      records.forEach(
        (item) => {

          map[item.date] =
            item;

        }
      );

      const calendar = [];

      for (
        let i = 364;
        i >= 0;
        i--
      ) {

        const day =
          new Date();

        day.setDate(
          day.getDate() - i
        );

        const date =
          day
            .toISOString()
            .split("T")[0];

        calendar.push({

          date,

          pagesRead:
            map[date]
              ?.pagesRead || 0,

          minutesRead:
            map[date]
              ?.minutesRead || 0,

        });

      }

      setHeatmap(
        calendar
      );

    };

    const generateMonthLabels = () => {

  const labels = [];

  let lastMonth = "";

  heatmap.forEach((day, index) => {

    const date = new Date(day.date);

    const month = date.toLocaleString(
      "default",
      { month: "short" }
    );

    if (month !== lastMonth) {

      labels.push({
        month,
        index,
      });

      lastMonth = month;

    }

  });

  return labels;

};

  const getColor =
    (pages) => {

      if (pages === 0)
        return "#ebedf0";

      if (pages <= 10)
        return "#9be9a8";

      if (pages <= 30)
        return "#40c463";

      if (pages <= 60)
        return "#30a14e";

      return "#216e39";

    };

    const monthLabels =
  generateMonthLabels();

  return (

  <div className="heatmap-card">

    <h2>
      📅 Reading Activity
    </h2>

    <div className="heatmap-wrapper">

      <div className="day-labels">

        <span>Mon</span>
        <span>Wed</span>
        <span>Fri</span>

      </div>

      <div className="heatmap-container">

       <div className="month-labels">

  {monthLabels.map((item) => (

    <span
      key={item.index}
      style={{
        gridColumnStart:
          Math.floor(item.index / 7) + 1,
      }}
    >
      {item.month}
    </span>

  ))}

</div>

        <div className="heatmap-grid">

          {heatmap.map((day) => (

            <div

              key={day.date}

              className="heatmap-cell"

              style={{
                background:
                  getColor(day.pagesRead),
              }}

              title={`${day.date}

Pages: ${day.pagesRead}

Minutes: ${day.minutesRead}`}

            />

          ))}

        </div>

      </div>

    </div>

    <div className="heatmap-legend">

      <span>Less</span>

      <div
        className="legend-box"
        style={{background:"#ebedf0"}}
      />

      <div
        className="legend-box"
        style={{background:"#9be9a8"}}
      />

      <div
        className="legend-box"
        style={{background:"#40c463"}}
      />

      <div
        className="legend-box"
        style={{background:"#30a14e"}}
      />

      <div
        className="legend-box"
        style={{background:"#216e39"}}
      />

      <span>More</span>

    </div>

  </div>

);

}

export default ReadingHeatmap;