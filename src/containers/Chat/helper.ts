import api from "../../services/api";

const UserIsConnected = async () => {
  let codigo = null;
  codigo = Number(sessionStorage.getItem("id"));

  if (codigo) {
    const user = await api.fetchUser(codigo);

    if (user) {
      return user;
    }
  } else {
    codigo = Number(localStorage.getItem("id"));
    if (codigo) {
      const user = await api.fetchUser(codigo);
      if (user) {
        return user
      };
    }
    alert('User has been disconnected');
    return null;
  }
};

export const handleConnection = async (setUser: any, history: any) => {
  const connected = await UserIsConnected();
  if (!connected) {
    history.push("/");
  } else {
    setUser(connected)
  }

};

export const handleGetMessages = async (props: any) => {
  try {
    const response = await api.fetchMessages();
    props.setData(response);
  } catch (err) {
    console.log("err", err);
  }
};


