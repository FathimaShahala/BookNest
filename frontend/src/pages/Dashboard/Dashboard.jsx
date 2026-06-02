import "./Dashboard.css";

function Dashboard() {

  return (
    <div className="dashboard">

      <h1>
        My Reading Dashboard
      </h1>

      <div className="card">
        Reading Goal Progress
      </div>

      <div className="card">
        Currently Reading
      </div>

      <div className="card">
        Completed Books
      </div>

    </div>
  );
}

export default Dashboard;