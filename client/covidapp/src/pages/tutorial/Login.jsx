function Login() {
    const handleSubmit = (event) => {
      event.preventDefault();
      const username = event.target.elements.username.value;
      const password = event.target.elements.password.value;
  
      console.log({ username, password });
  
      fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password})
      })
        .then((response) => response.json())
        .then((data) => {
          window.localStorage.setItem("token", data.msg)
        });
    };
    return (
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Login</legend>
          <input name="username" value="admin" />
          <input name="password" value="admin" />
          <button>Login</button>
        </fieldset>
      </form>
    );
  }
  
  export default Login;