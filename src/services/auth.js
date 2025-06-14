import axios from './api';

const AuthService = {
  async userRegister(user) {
    const { data } = await axios.post('/auth/register/', user); 
    return data;
  },

  async userLogin(user) {
    const { data } = await axios.post('/auth/token/', user);
    return data;
  },

  async getUser() {
    const { data } = await axios.get('/auth/profile/');
    return data;
  },

  async updateUser(user) {
    const { data } = await axios.put('/auth/profile/', user);
    return data;
  },

  async refreshToken(refresh) {
    const { data } = await axios.post('/auth/token/refresh/', { refresh });
    return data;
  },
};

export default AuthService;
