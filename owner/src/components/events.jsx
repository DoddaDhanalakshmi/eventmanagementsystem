import { useNavigate } from "react-router-dom";

function EventTypes() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Select Event Type</h2>

      <button onClick={() => navigate("/packages/wedding")}>
        Wedding
      </button><br /><br />

      <button onClick={() => navigate("/packages/birthday")}>
        Birthday
      </button><br /><br />

      <button onClick={() => navigate("/packages/reception")}>
        Reception
      </button><br /><br />
      
      {/* <button onClick={() => navigate("/packages/reception")}>
        Sangeeth
      </button><br /><br />
      
      <button onClick={() => navigate("/packages/reception")}>
        cradleCermony
      </button><br /><br /> */}
      <button onClick={() => navigate("/")}>Back</button>
    </div>
  );
}

export default EventTypes;
