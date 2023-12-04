import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthToken } from "store/postman";

export function Authorization() {
  const authToken = useSelector((state) => state.automation.authToken);

  const [token, setToken] = useState(authToken);
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const newToken = event.target.value;
    setToken(newToken);
    dispatch(setAuthToken(newToken));
  };

  return (
    <div>
      <h3>Token</h3>
      <input
        value={token}
        style={{ width: "50vh", height: "30px", border: "1px solid #78787" }}
        onChange={handleInputChange}
      ></input>
    </div>
  );
}
