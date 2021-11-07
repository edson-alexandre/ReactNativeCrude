import React, { useContext, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';

import { Input, Icon } from 'react-native-elements';
import UsersContext from '../context/UsersContext';

export default ({ route, navigation }) => {
  const { dispatch } = useContext(UsersContext);

  const [user, setUser] = useState(route.params ? route.params : {});
  return (
    <View style={style.form}>
      <Input
        label="Nome"
        onChangeText={name => setUser({ ...user, name })}
        placeholder="Informe o nome"
        value={user.name}
        rightIcon={<Icon name="person" />}
      />
      <Input
        label="E-mail"
        onChangeText={email => setUser({ ...user, email })}
        placeholder="Informe o E-mail"
        value={user.email}
        rightIcon={<Icon name="email" />}
      />
      <Input
        label="URL do Avatar"
        onChangeText={avatarUrl => setUser({ ...user, avatarUrl })}
        placeholder="Informe a URL do Avatar"
        value={user.avatarUrl}
        rightIcon={<Icon name="http" />}
      />
      <Button
        title="Salvar"
        onPress={() => {
          dispatch({
            type: user.id ? 'updateUser' : 'createUser',
            payload: user,
          });
          navigation.goBack();
        }}
      />
    </View>
  );
};

const style = StyleSheet.create({
  form: {
    padding: 12,
  },
});
