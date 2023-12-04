import "./WelcomeMsg.css";

const WelcomeMsg = () => {
  const username = localStorage.getItem("username");

  // Get the current hour
  const currentHour = new Date().getHours();

  let greeting;
  if (currentHour >= 5 && currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour >= 12 && currentHour < 17) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  return (
    <div className="welcome-outer-container">
      <div className="welcome-container">
        <h1 className="welcome-text">{greeting},&nbsp;</h1>
        <h1 className="welcome-name">{username}</h1>
      </div>
      <h3 className="welcome-sub-text">Your performance summary this week</h3>
    </div>
  );
};

export default WelcomeMsg;
