import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000'
});

axiosInstance.interceptors.response.use(
  response => response,
  err => {
    const { response } = err;

    /*const isLogout = window.location.pathname.includes('logout');
      if (!isLogout && response && response.status === 401) {
        API.goToLogin();
      } else if (response && response.status >= 500) {
        // @TODO: show error page or modal
      }*/
    return Promise.reject(err);
  }
);

class API {
  /*static async initApp() {
      let user = null;
      try {
        user = await API.getUser();
      } catch (e) {
        if (e.response && e.response.status === 403) {
          user = {
            authorities: [],
          };
        }
      }
      let dataMap = {
        user,
      };
      return dataMap;
    }

    static goToLogin() {
        window.location.replace(`http://localhost:3000/login`);
    }

    static goToLogout() {
        window.location.replace(`http://localhost:3000/logout`);
    }
    
    static async getUser() {
      const { data } = await axiosInstance.get(`/user`);
      return data;
    } */
  static async createEvent() {
    let path = `/api/events/create/`;
    //let path = '/api/events/list/';
    const { data } = await axiosInstance.post(path);
    return data;
  }
  static async getEvents(page = 1, pageSize = 15) {
    let path = `/api/events/list/?page=${page}&page_size=${pageSize}`;
    const { data } = await axiosInstance.get(path);
    console.log('DATOSSSSSSSS: ', data);
    return data;
  }
}

export default API;
