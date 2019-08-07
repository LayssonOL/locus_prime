import * as React from "react";
import Login from "./Login";
import UserPanel from "./UserPanel";
import { useState, useEffect } from "react";

const App = (pros: any) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(user)
    setLoggedIn(loggedIn);
  }, [user, loggedIn]);

  if (loggedIn && user) {
    console.log(user)
      return(
          <div>
              <UserPanel user={user}/>
          </div>
      );
  }else{
    return (
        <div>
          <Login setUser={setUser} setLoggedIn={setLoggedIn} />
        </div>
      );
  }
};

export default App;
