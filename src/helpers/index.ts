export const apiUrl = String(process.env.REACT_APP_API_URL);

const apiUrls = {
  fetchMessages: apiUrl + '/messages',
  fetchUsers: apiUrl + '/users',
  login: apiUrl + '/login',
}

export default apiUrls;