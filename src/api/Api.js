import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://juanpsenn.pythonanywhere.com/'
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
  static async createEvent(form) {
    let path = `/api/events/create/`;
    const { data } = await axiosInstance.post(path, form);
    return data;
  }

  static async updateEvent(id, form) {
    let path = `/api/events/update/${id}/`;
    const { data } = await axiosInstance.put(path, form);
    return data;
  }

  static async getEvents(page = 1, pageSize = 15, search) {
    let path = !!search 
      ? `/api/events/list/?page=${page}&page_size=${pageSize}&q=${search}`
      : `/api/events/list/?page=${page}&page_size=${pageSize}`;
    const { data } = await axiosInstance.get(path);
    return data;
  }

  static async getEventById(id) {
    let path = `/api/events/get/${id}/`;
    const { data } = await axiosInstance.get(path);
    return data;
  }
}

export default API;
