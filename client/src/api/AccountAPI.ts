import axios, { AxiosError } from "axios";
import type { passowordType } from "../pages/commonComponents/Setting";
import type { workeraddtype } from "../pages/admin/Workers";

import type { productTypes } from "../pages/admin/Inventory";
const URI = import.meta.env.VITE_API_URL;



export type userProfileType = {
  Address: string;
  firstName: string;
  phone?: number | null;
  secondName?: string;
  _id: string;
};

export const updateUserProfile = async (
  route: string,
  data: userProfileType
) => {
  try {
    const response = await axios.put(URI + route, data);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    return err?.response;
  }
};

export const changepasswordAPI = async (route: string, data: passowordType) => {
  try {
    const response = await axios.put(URI + route, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    return err?.response;
  }
};

export const resetpasswordAPI = async (route: string, data: { id: string }) => {
  try {
    const response = await axios.put(URI + route, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    return err?.response;
  }
};

export const addworker = async (route: string, data: workeraddtype) => {
  try {
    const response = await axios.post(URI + route, data);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    return err?.response;
  }
};

export const deleteworker = async (route: string, data: { id: string }) => {
  try {
    const response = await axios.delete(URI + route, { data: data });
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    return err?.response;
  }
};

export const getallusers = async (route: string) => {
  try {
    const response = await axios.get(URI + route);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    return err?.response;
  }
};

//category

export const getcategory = async (route: string) => {
  try {
    const response = await axios.get(URI + route);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    return err?.response;
  }
};

export const deletecategory = async (route: string, data: { id: string }) => {
  try {
    const response = await axios.delete(URI + route, { data: data });
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    return err?.response;
  }
};

//inventory

export const getinventory = async (route: string) => {
  try {
    const response = await axios.get(URI + route, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    return err?.response;
  }
};

export const updateinventory = async (route: string, data: productTypes) => {
  try {
    const response = await axios.put(URI + route, data);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    return err?.response;
  }
};

export const deleteproduct = async (route: string, data: { id: string }) => {
  try {
    const response = await axios.delete(URI + route, { data: data });
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    return err?.response;
  }
};

//wishlist

export const getWishlist = async (route: string) => {
  try {
    const response = await axios.get(URI + route, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    return err?.response;
  }
};

//mypurchases
export const getMypurchase = async (route: string) => {
  try {
    const response = await axios.get(URI + route, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    return err?.response;
  }
};

export const cancelOrder = async (route: string, data: { orderId: string }) => {
  try {
    const response = await axios.put(URI + route, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    return err?.response;
  }
};

export const addReview = async (
  route: string,
  data: {
    orderId: string;
    productId: string;
    reviewStar: number;
    reviewComment: string;
  }
) => {
  try {
    const response = await axios.post(URI + route, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    return err?.response;
  }
};

export const getReview = async (route: string) => {
  try {
    const response = await axios.get(URI + route, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    return err?.response;
  }
};

export const updateReview = async (
  route: string,
  data: { reviewId: string; reviewStar: number; reviewComment: string }
) => {
  try {
    const response = await axios.put(URI + route, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    return err?.response;
  }
};

export const deleteReview = async (route: string) => {
  try {
    const response = await axios.delete(URI + route, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    return err?.response;
  }
};

//Orders
export const getOrdersAdmin = async (route: string) => {
  try {
    const response = await axios.get(URI + route, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    return err?.response;
  }
};

export const updateOrderStatus = async (
  route: string,
  data: { orderId: string }
) => {
  try {
    const response = await axios.put(URI + route, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    return err?.response;
  }
};

//Overview(admin)

export const getOverViewDetails = async () => {
  try {
    const response = await axios.get(URI + "account/overview", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    return err?.response;
  }
};


export const getDashboardDetails = async () => {
  try {
    const response = await axios.get(URI + "account/dashboard", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    return err?.response;
  }
};
