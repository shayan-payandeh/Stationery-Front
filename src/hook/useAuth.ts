"use client";
import {
  IUserPost,
  IUserRegisterPost,
  IUserUpdatePatchOne,
  IUserUpdatePatchTwo,
} from "@/interface/user";
import authService from "@/service/authService";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGetUsers = () =>
  useQuery({
    queryKey: ["get-users"],
    queryFn: authService.getAllUsers,
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useGetProfile = (token: boolean) =>
  useQuery({
    queryKey: ["getProfile", token],
    queryFn: () => authService.getProfile(),
    retry: false,
    refetchOnWindowFocus: true,
    enabled: !!token,
  });

export const useRegister = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (data: IUserRegisterPost) => authService.register(data),
    onSuccess: (data) => {
      toast.success(data.data.data.message);
      return queryClient.invalidateQueries({ queryKey: ["getProfile"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message‌ || "خطا در ارتباط با سرور");
    },
  });

export const useLogin = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (data: IUserPost) => authService.login(data),
    onSuccess: (data) => {
      toast.success(data?.data?.data.message);
      return queryClient.invalidateQueries({ queryKey: ["getProfile"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message‌ || "خطا در ارتباط با سرور");
    },
  });

export const useLogout = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ["getProfile"] });
    },
  });

export const useUserUpdate = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: IUserUpdatePatchOne | IUserUpdatePatchTwo;
    }) => authService.userUpdate(id, data),

    onSuccess: (data) => {
      toast.success(data.data.data.message);
      return queryClient.invalidateQueries({ queryKey: ["getProfile"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });
