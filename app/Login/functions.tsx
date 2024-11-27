// app/Login/functions.tsx

export const handleButtonClick = (buttonId: number, setAction: Function, setRole: Function) => {
  if (buttonId === 1) {
    setAction("login");
    setRole("student");
  } else if (buttonId === 2) {
    setAction("login");
    setRole("teacher");
  } else if (buttonId === 3) {
    setAction("register");
    setRole(null);
  }
};

export const handleRoleSelection = (role: "teacher" | "student", setRole: Function) => {
  setRole(role);
};

export const handleMainAction = async (
  id: string,
  password: string,
  action: string,
  role: string | null
) => {
  const endpoint = action === "register" ? "/api/register/route" : "/api/login/route";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, password, role }),
    });

    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (err: unknown) {
    console.error("Error during API request:", err);
    if (err instanceof Error) {
      throw new Error(err.message || "Unknown error occurred!");
    }
    throw new Error("An unexpected error occurred!");
  }
};
