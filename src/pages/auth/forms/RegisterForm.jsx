function RegisterForm() {
  return (
    <div>
      <h2>Register Form</h2>
      <form>
        <input placeholder="Username" />
        <input type="password" placeholder="Password" />
        <input placeholder="Email" />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterForm;
