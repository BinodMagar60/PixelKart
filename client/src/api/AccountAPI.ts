import axios, { AxiosError } from "axios";
const URI = import.meta.env.VITE_API_URL;

export type userProfileType = {
  Address: string,
  firstName: string,
  phone?: number | null,
  secondName?: string,
  _id: string,
};

export const updateUserProfile = async (route: string, data:userProfileType) => {
  try {
    const response = await axios.put(URI + route, data);
    return response.data
  } catch (error) {
    const err = error as AxiosError;
    return err?.response;
  }
};
