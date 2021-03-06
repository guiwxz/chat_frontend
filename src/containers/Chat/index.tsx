import React from "react";
import { useHistory } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { Grid, Typography, Button } from "@material-ui/core";

import { UserProps } from "./index.d";

import skt from "../../services/socketApi";

import { handleConnection, handleGetMessages } from "./helper";

const Chat: React.FC = () => {
  const [data, setData] = React.useState([]);
  const [user, setUser] = React.useState<UserProps>({
    codigo: 0,
    nickname: "",
  });
  const history = useHistory();

  React.useEffect(() => {
    handleConnection(setUser, history);
    handleGetMessages({ setData });

    skt.onSendBack(setData);
  }, [history]);

  const handleSubmit = (values: any) => {
    if(!localStorage.getItem('id') && !sessionStorage.getItem('id')){
      alert('User has been disconnected');
      history.push('/');
    }
    skt.emitMessage(
      {
        cod_user: user.codigo,
        message: values.message,
        nickname: user.nickname,
      },
      setData
    );
  };

  return (
    <Grid container spacing={3} style={{ marginLeft: '50px', height: '300px', margin: '5px', width: '500px' }}>
      <Grid item xs={12}>
        <Grid container style={{ overflow: 'scroll', height: '500px' }}>
          {data.map((it: any, index: number) => (
            <Grid item xs={12} key={index}>
              <Typography variant="body1">
                <b>{it.nickname}</b>: {it.message}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Form
          initialValues={null}
          onSubmit={handleSubmit}
          render={(formProps) => {
            return (
              <form noValidate onSubmit={formProps.handleSubmit}>
                <Grid container spacing={1}>
                  <Grid item xs={12} >
                    <Field
                      style={{ height: '30px', padding: '4px', marginRight: '10px' }}
                      name="message"
                      component="input"
                      placeholder="Digite sua mensagem"
                      afterSubmit={() => formProps.form.change("message", "")}
                    />
                    <Button type="submit">Enviar</Button>
                  </Grid>
                </Grid>
              </form>
            );
          }}
        />
      </Grid>
    </Grid>
  );
};

export default Chat;
