import { useEffect } from "react";
import { userService } from "../services/user.service";

export const HomePage = () => {
  const fetchUsers = async () => {
    try {
      const data = await userService.getUsers();
      console.log("The users are " + data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};
