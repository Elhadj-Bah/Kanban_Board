import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {

  // TODO: make a POST request to the login route

  try {
    // Make a POST request to the login route
    
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo)
    });
    const data = await response.json();
    // Throw if response status is not okay

    if (!response.ok) {
      throw new Error("Error logging in");
    }
    return data;
  } catch (error) {
    console.error("Error from user login", error);
    return Promise.reject('could not fetch user info');
  }
};

export { login };
