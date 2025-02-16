import axios from "axios";
import { api } from "./auth";
import { isNotificationState } from "../atoms/notificationState";

export async function axiosNotification() {
  try {
    const response = await api.get("/api/users/notifications");
    if (response.status === 200) {
      const data = response.data.data;
      return data;
    } else {
      return;
    }
  } catch (error) {
    console.log(error);
    return error.response ? error.response.status : 500;
  }
}

export async function axiosReadNotification(notificationIds) {
  console.log(notificationIds);
  try {
    const response = await api.patch(
      "/api/users/notifications",
      { notificationIds },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.status;
  } catch (error) {
    console.log(error);
    return error.response ? error.response.status : 500;
  }
}
