// app/services/allApi.ts
import axios from "axios";

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

export const addCountry = async (payload:object) => {
    const res = await API.post("/api/master/country/add_country", payload);
    return res.data;
};

export const editCountry = async (id:string,payload:object) => {
    const res = await API.put(`/api/master/country/update_country/${id}`,payload);
    return res.data;
};
export const deleteCountry = async (id:string) => {
    const res = await API.delete(`/api/master/country/${id}`);
    return res.data;
};

// Item Category
export const itemCategoryList = async () => {
  try {
    const res = await API.get("/api/settings/item_category/list");
    return res.data;
  } catch (error: unknown) {
    return handleError(error);
  }
};

export const itemCategoryById = async (id: number) => {
  try {
    const res = await API.get(`/api/settings/item_category/${id}`);
    return res.data;
  } catch (error: unknown) {
    return handleError(error);
  }
};

export const createItemCategory = async (category_name: string, status: 0 | 1) => {
  try {
    const res = await API.post(`/api/settings/item_category/create`, { category_name, status });
    return res.data;
  } catch (error: unknown) {
    return handleError(error);
  }
};

export const updateItemCategory = async (category_id: number, category_name?: string | undefined, status?: 0 | 1 | undefined) => {
  const body = {
      ...(category_name && { category_name }),
      ...(status !== undefined && { status }),
      category_id
  };

  if (Object.keys(body).length === 0) {
      throw new Error("No data provided for update.");
  }

  try {
    const res = await API.put(`/api/settings/item_category/${category_id}/update`, body);
    return res.data;
  } catch (error: unknown) {
    return handleError(error);
  }
};

export const deleteItemCategory = async (category_id: number) => {
  try {
    const res = await API.delete(`/api/settings/item_category/${category_id}/delete`);
    return res.data;
  } catch (error: unknown) {
    return handleError(error);
  }
};

// Item Sub Category
export const itemSubCategoryList = async () => {
  try {
    const res = await API.get("/api/settings/item-sub-category/list");
    return res.data;
  } catch (error: unknown) {
    return handleError(error);
  }
};

export const itemSubCategoryById = async (id: string) => {
  try {
    const res = await API.get(`/api/settings/item-sub-category/${id}`);
    return res.data;
  } catch (error: unknown) {
    return handleError(error);
  }
};

export const createItemSubCategory = async (category_id: number, sub_category_name: string, status: 0 | 1) => {
  try {
    const res = await API.post(`/api/settings/item-sub-category/create`, { category_id, sub_category_name, status, created_user: 13 });
    return res.data;
  } catch (error: unknown) {
    return handleError(error);
  }
};

export const updateItemSubCategory = async (category_id: number, sub_category_name: string, status: 0 | 1) => {
  try {
    const res = await API.put(`/api/settings/item-sub-category/${category_id}/update`, { sub_category_name, status });
    return res.data;
  } catch (error: unknown) {
    return handleError(error);
  }
};

export const deleteItemSubCategory = async (sub_category_id: number) => {
  try {
    const res = await API.delete(`/api/settings/item-sub-category/${sub_category_id}/delete`);
    return res.data;
  } catch (error: unknown) {
    return handleError(error);
  }
};

function handleError(error: unknown) {
  if (axios.isAxiosError(error) && error.response) {
    console.error('API Error:', error.response.data);
    return { error: true, data: error.response.data };
  } else if (error instanceof Error) {
    console.error('Request Error:', error.message);
    return { error: true, data: { message: error.message } };
  } else {
    console.error('An unknown error occurred.');
    return { error: true, data: { message: 'An unknown error occurred.' } };
  }
}