import React from "react";
import { useHistory } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { Grid, Typography, Button } from "@material-ui/core";

import { ChatProps, UserProps } from "./index.d";

import skt from "../../services/socketApi";
import api from "../../services/api";

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
  }, []);

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
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Grid container>
          {data.map((it: any, index: number) => (
            <Grid item xs={12} key={index}>
              <Typography variant="h6">
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
                  <Grid item xs={12}>
                    <Field
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
