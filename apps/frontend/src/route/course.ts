import { Course } from "@/types";
import { api } from "@/route/api";

export const getCourses = async () => {
  const response = await api.get("/courses");
  return response.data;
};

export const findCourse = async (id: string) => {
  const response = await api.get("/meter/get", {
    params: {
      id,
    },
  });
  return response.data.data;
};

export const addCourse = async (meter: Partial<Meter>, token: string) => {
  console.log("meter", meter);
  await api.post("/meter/insert", meter, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateCourse = async (meter: Partial<Meter>, token: string) => {
  await api.put("/meter/update", meter, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteCourse = async (id: string) => {
  await api.delete("/meter/delete");
};
