import React from 'react';
import { useHistory } from 'react-router-dom';

import { OnChange } from 'react-final-form-listeners'
import { Form, Field } from 'react-final-form';
import { Grid, Button } from '@material-ui/core';

import api from '../../services/api';

const Login: React.FC = () => {
  const [userLabel, setUserLabel] = React.useState(false);
  const [senhaLabel, setSenhaLabel] = React.useState(false);

  const history = useHistory();

  const handleSubmit = async (values: any) => {
    try {
      const { codigo } = await api.fetchLogin(values.nickname, values.senha);
      
      if (codigo) {
        try {
          sessionStorage.setItem('id', codigo);
        } catch (err) {
          localStorage.setItem('id', codigo);
          console.log('Could not set on sessionStorage. Saved on localStorage instead')
        }
        history.push('/chat');
      }

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Grid container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                      name="nickname" 
                      component="input"
                      placeholder="Seu nome de usuário"
                      label={userLabel ? 'Usuário' : null}
                      afterSubmit={() => formProps.form.change('message', '')}
                    />
                    <OnChange name="nickname">
                      {(value: string) => {
                        if(value.length > 0){
                          setUserLabel(true);
                        }else{
                          setUserLabel(false);
                        }
                      }}
                    </OnChange>
                  </Grid>
                  <Grid item xs={12}>
                    <Field 
                      name="senha" 
                      component="input" 
                      placeholder="Sua senha"
                      type="password"
                      label={senhaLabel ? 'Senha' : null}
                      afterSubmit={() => formProps.form.change('message', '')}
                    />
                    <OnChange name="senha">
                      {(value: string) => {
                        if(value.length > 0){
                          setSenhaLabel(true);
                        }else{
                          setSenhaLabel(false);
                        }
                      }}
                    </OnChange>
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit">
                      Entrar
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )
          }}
        />
      </Grid>
    </Grid>
  );
}

export default Login