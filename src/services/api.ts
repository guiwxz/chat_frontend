import axios, { AxiosResponse } from 'axios';
import apiUrls, { apiUrl } from '../helpers';

import { MessagesPayload, UserPayload } from './api.d'

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': ''
  },
})

const parseResponse = (response: AxiosResponse) => {
  const res = response;
  if (response.status === 200) {
    return res.data;
  }
  throw res;
}

class Api {
  fetchMessages = async (params?: any, token = 'aaa') => {
    return await api.get(`${apiUrls.fetchMessages}?${params}`, {
      method: 'GET',
      headers: {
        'Authorization': token,
      },
      
    }).then(parseResponse)
      .catch(err => console.log('erro no fetch', err)
    );
  };
  
  insertMessage = async (payload: MessagesPayload, token = 'aaa') => {
    return await api.post(`${apiUrls.fetchMessages}`, payload, {
      method: 'POST',
      headers: {
        'Authorization': token,
      },
    }).then(parseResponse)
      .catch(err => console.log(err)
    );
  };

  fetchLogin = async (nickname: string, senha: string, token = 'aaa') => {
    return await api.get(`${apiUrls.login}?nickname=${nickname}&senha=${senha}`, {
      method: 'GET',
      headers: {
        'Authorization': token,
        
      },
    }).then(parseResponse)
      .catch(err => console.log(err))
  }

  fetchUser = async (id: number, token = 'aaa') => {
    return await api.get(`${apiUrls.fetchUsers}/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': token,
      }
    }).then(parseResponse)
      .catch(err => console.log(err))
  }
}

export default new Api();

// axios.create({
//   baseURL: 'http://192.168.0.106/3333',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify()
// })