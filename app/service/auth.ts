import axios from "axios"
import { User } from "../type/user-type"
import { api } from "@/lib/axios";

export type ApiResponse<T> = {
    success: boolean;
    data: T | null;
    message: string;
    errors: Record<string, string[]> | null;
};
export const authRegister = async (payload: User) => {
    const { data } = await api.post<ApiResponse<User>>(
        "/register",
        payload
    );
    return data;
}