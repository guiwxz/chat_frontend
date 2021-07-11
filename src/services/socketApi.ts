import socketIOClient from 'socket.io-client';
import { apiUrl } from '../helpers';

const socket = socketIOClient(apiUrl);

// on: listen to back socket emitions
// emit: emit to the sever so it can listen

class skt {
  onSendBack = (setData: React.Dispatch<any>) => {
    socket.on("sendMessageBack", data => {
      setData((previous: any) => [...previous, data]);
    })
  };
  
  emitMessage = (payload: any, setData: any) => {
    socket.emit("sendMessage", payload);
    setData((previous: any) => [...previous, payload]);
  };
  
  // onPreviousMessages = (setPreviousData: any) => {
  //   socket.on("previousMessages", (data: Array<any>) => {
  //     console.log('precious', data);
  //     setPreviousData(data);
  //   });
  // };
}

export default new skt();

