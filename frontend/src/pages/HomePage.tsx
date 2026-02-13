import { Button } from "@mui/material";
import { useEffect } from "react";

import { userService } from "@/services/user.service";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";

import {
  selectIsActive,
  updateIsActive,
} from "../components/redux/common/commonSlice";

export const HomePage = () => {
  const dispatch = useAppDispatch();

  const isActive = useAppSelector(selectIsActive);

  const handleClick = () => {
    dispatch(updateIsActive(!isActive));
  };

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
      {isActive && <div>Active is true</div>}
      <Button onClick={handleClick}> Click me for active update </Button>
      <h1>Home Page</h1>
    </div>
  );
};
