import { useEffect, useReducer } from "react";

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};


function Secret() {
  const token = window.localStorage.getItem("token");
  const user = parseJwt(token)
  useEffect(() => {
    fetch("http://localhost:4000/auth/secret", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

  return <div>{ user.role === "user" ? "i'm a user" : "i am admin"}
  
  <pre>{JSON.stringify(user, null, 2)}</pre>
  </div>;
}

export default Secret;