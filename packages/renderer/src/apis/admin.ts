import type { IUser } from '../types/user';
import http from '../utils/request';

export const requestAdminLogin = (data: {password: string}) => {
  return http.request({
    url: '/admin/login',
    method: 'POST',
    data,
  });
};

export const requestGetUserList = () => {
  return http.request({
    url: '/admin/user',
    method: 'GET',
  });
};

export const requestGetUser = (data: {id: number}) => {
  return http.request({
    url: '/admin/user',
    method: 'GET',
    data,
  });
};

export const requestSaveUserAvatar = (data: {id: number}) => {
  return http.request({
    url: '/admin/user/avatar/capture',
    method: 'POST',
    data,
  });
};

export const requestAddUser = () => {
  return http.request({
    url: '/admin/user',
    method: 'POST',
  });
};

export const requestEditUser = (data: IUser) => {
  return http.request({
    url: '/admin/user',
    method: 'PUT',
    data,
  });
};

export const requestDeleteUser = (data: {id: number}) => {
  return http.request({
    url: '/admin/user',
    method: 'DELETE',
    data,
  });
};

export const requestGetSettings = () => {
  return http.request({
    url: '/admin/setting',
    method: 'GET',
  });
};

export const requestEditSettings = (data: any) => {
  return http.request({
    url: '/admin/setting',
    method: 'PUT',
    data,
  });
};
