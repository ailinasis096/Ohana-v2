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

  //Crear campañas
  static async createEvent(form) {
    let path = `/api/events/create/`;
    const config = {headers:{'Authorization':`Token ${localStorage.getItem('token')}`}}
    const { data } = await axiosInstance.post(path, form, config);
    return data;
  }

  // Actualizar campañas de donaciones
  static async updateEvent(id, form) {
    let path = `/api/events/update/${id}/`;
    const config = {headers:{'Authorization':`Token ${localStorage.getItem('token')}`}}
    const { data } = await axiosInstance.put(path, form,config);
    return data;
  }

  //Obtener campañas
  static async getEvents(page = 1, pageSize = 15, search) {
    const config = {headers:{'Authorization':`Token ${localStorage.getItem('token')}`}}
    let path = !!search
      ? `/api/events/list/?page=${page}&page_size=${pageSize}&q=${search}`
      : `/api/events/list/?page=${page}&page_size=${pageSize}`;
    const { data } = await axiosInstance.get(path,config);
    return data;
  }

  //Filtro de campaña por Id
  static async getEventById(id) {
    let path = `/api/events/get/${id}/`;
    const config = {headers:{'Authorization':`Token ${localStorage.getItem('token')}`}}
    const { data } = await axiosInstance.get(path, config);
    return data;
  }

  //Obtener las categorías posibles de las campañas
  static async getCategories() {
    let path = `/api/events/categories/list/`;
    const config = {headers:{'Authorization':`Token ${localStorage.getItem('token')}`}}
    const { data } = await axiosInstance.get(path, config);
    return data;
  }

  // Obtener las donaciones registradas para una campaña
  static async getDonationsByEvent(id) {
    let path = `/api/donations/list/by-event/?event=${id}`;
    const { data } = await axiosInstance.get(path);
    return data;
  }

  // Obtener las donaciones realizadas por un usuario
  static async getDonationsByUser(id) {
    let path = `/api/donations/list/by-user/?user=${id}`;
    const { data } = await axiosInstance.get(path);
    return data;
  }

    
  // Obtener las donaciones de forma general
  static async getDonations() {
    let path = `/api/donations/list/self/`;
    const { data } = await axiosInstance.get(path);
    return data;
  }

  // Generar una donación
  static async createDonation(form) {
    let path = `/api/donations/create/`;
    const config = {headers:{'Authorization':`Token ${localStorage.getItem('token')}`}}
    const { data } = await axiosInstance.post(path, config, form);
    return data;
  }

  //login
  static async login(logueo) {
    let path = `/api/auth/signin/`;
    const { data } = await axiosInstance.post(path, logueo);
    return data;
  }

  //logout
  static async logout() {
    let path = `/api/auth/signup/`;

    const { data } = await axiosInstance.post(path);
    return data;
  }
}

export default API;
