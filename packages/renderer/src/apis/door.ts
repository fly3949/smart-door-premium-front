import http from '../utils/request';

export const requestOpenDoorByPassword = (data: {password: string}) => {
  return http.request({
    url: '/door/enter/password',
    method: 'POST',
    data,
  });
};
