import "./StatsSection.css";

function StatsSection({
  books
}) {

  const completed =
    books.filter(
      b =>
        b.readingStatus ===
        "Completed"
    ).length;

  const reading =
    books.filter(
      b =>
        b.readingStatus ===
        "Currently Reading"
    ).length;

  const want =
    books.filter(
      b =>
        b.readingStatus ===
        "Want To Read"
    ).length;

  return (
    <div className="stats">

      <div className="stat-card">
        <h3>{books.length}</h3>
        <p>Total Books</p>
      </div>

      <div className="stat-card">
        <h3>{want}</h3>
        <p>Want To Read</p>
      </div>

      <div className="stat-card">
        <h3>{reading}</h3>
        <p>Reading</p>
      </div>

      <div className="stat-card">
        <h3>{completed}</h3>
        <p>Completed</p>
      </div>

    </div>
  );
}

export default StatsSection;