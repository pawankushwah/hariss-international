// app/services/allApi.ts

import axios, { AxiosError } from "axios"; 


const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, 
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token")
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export const login = async (credentials: { email: string; password: string }) => {
  const res = await API.post("/api/master/auth/login", credentials);
  return res.data;
};

export const isVerify = async () => {
  const res = await API.get("/api/master/auth/me");
  return res.data;
};

export const companyList = async () => {
  const res = await API.get("/api/master/company/list_company");
  return res.data;
};

export const companyById = async (id: string) => {
  const res = await API.get(`/api/master/company/${id}`);
  return res.data;
};

export const updateCompany = async (id: string, data: object) => {
  const res = await API.put(`/api/master/company/${id}`, data);
  return res.data;
};

export const deleteCompany = async (id: string) => {
  const res = await API.delete(`/api/master/company/${id}`);
  return res.data;
};

export const logout = async () => {
  try{
    const res = await API.post("/api/master/auth/logout");
    return res.data;
  } catch (error) {
    console.log(error)
  }
};

export const addCompany = async (data: Record<string, string>) => {
  try {
    const res = await API.post("/api/master/company/add_company", data);
    return res.data;
  } catch (error) {
    console.error("Add company failed ❌", error);
    throw error;
  }
};


export const countryList = async (data: Record<string, string>) => {
  try {
    const res = await API.get("/api/master/country/list_country", data);
    return res.data;
  } catch (error) {
    console.error("Country List failed ❌", error);
    throw error;
  }
};

export interface RegionPayload {
  region_name: string;
  status?: number | null;
  country_id?: number | null;
}


export const addRegion = async (data: RegionPayload) => {
  try {
    const res = await API.post("/api/master/region/add_region", data);
    return res; // ✅ return full response
  } catch (error) {
    console.error("Add Region failed ❌", error);
    throw error;
  }
};


//  outlet channel  api 




export interface OutletChannelPayload {
  outlet_channel: string;
  status: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

export const createOutletChannel = async (
  payload: OutletChannelPayload
): Promise<ApiResponse> => {
  try {
    const response = await axios.post<ApiResponse>(
      "/api/settings/outlet-channels", // change if needed
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse>;
    if (axiosError.response?.data) {
      return axiosError.response.data;
    }
    throw new Error(axiosError.message);
  }
};
