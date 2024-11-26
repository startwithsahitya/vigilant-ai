export const handleButtonClick = (
  buttonNumber: number,
  setAction: (action: "login" | "register") => void,
  setRole: (role: "teacher" | "student" | null) => void
) => {
  switch (buttonNumber) {
    case 1:
      console.log("Student button clicked");
      setAction("login");
      setRole("student");
      break;
    case 2:
      console.log("Teacher button clicked");
      setAction("login");
      setRole("teacher");
      break;
    case 3:
      console.log("New Register button clicked");
      setAction("register");
      setRole(null);
      break;
    default:
      console.log("Unknown button clicked");
      break;
  }
};

export const handleRoleSelection = (
  selectedRole: "teacher" | "student",
  setRole: (role: "teacher" | "student" | null) => void
) => {
  setRole(selectedRole);
  console.log("Selected Role for Registration:", selectedRole);
};

export const handleMainAction = async (
  id: string,
  password: string,
  action: "login" | "register",
  role: "teacher" | "student" | null
) => {
  if (!id || !password) {
    alert("Please provide both email and password!");
    return;
  }

  const url = action === "login" ? "/api/auth/login" : "/api/auth/register";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: id, password, role }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(`Error: ${data.message || "Something went wrong"}`);
      console.error(`${action} failed:`, data.message);
      return;
    }

    console.log(`${action} successful:`, data);

    if (action === "login") {
      // Redirect based on role after successful login
      window.location.href = role === "student" ? "/Home/StudentHome" : "/Home/TeacherHome";
    } else if (action === "register") {
      // Redirect to login after successful registration
      alert("Registration successful! Please log in.");
      window.location.href = "/Login";
    }
  } catch (error) {
    console.error(`Error during ${action}:`, error);
    alert(`An error occurred while ${action}.`);
  }
};
