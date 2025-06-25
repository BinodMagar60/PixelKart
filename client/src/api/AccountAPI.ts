import axios, { AxiosError } from "axios";
import type { passowordType } from "../pages/commonComponents/Setting";
import type { workeraddtype } from "../pages/admin/Workers";
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

export const changepasswordAPI = async (route: string, data: passowordType) => {
  try {
    const response = await axios.put(URI + route, data, {
      withCredentials: true
    });
    return response.data
  } catch (error) {
    const err = error as AxiosError;
    return err?.response;
  }
}

export const resetpasswordAPI = async (route: string, data:{id: string}) => {
  try {
    const response = await axios.put(URI + route, data, {
      withCredentials: true
    });
    return response.data
  } catch (error) {
    const err = error as AxiosError;
    return err?.response;
  }
}


export const addworker = async (route: string, data: workeraddtype) => {
  try {
    const response = await axios.post(URI + route, data);
    return response.data
  } catch (error) {
    const err = error as AxiosError;
    return err?.response;
  }
};

export const deleteworker = async (route: string, data: {id: string}) => {
  try {
    const response = await axios.delete(URI + route, {data: data});
    return response.data
  } catch (error) {
    const err = error as AxiosError;
    return err?.response;
  }
};



export const getallusers = async (route: string) => {
  try {
    const response = await axios.get(URI + route);
    return response.data
  } catch (error) {
    const err = error as AxiosError;
    return err?.response;
  }
};



