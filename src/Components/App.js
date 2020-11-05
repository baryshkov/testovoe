import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';

import Main from './Main';

const App = () => {
  const [fetchedUser, setUser] = useState(null);
  const [popout, setPopout] = useState(<ScreenSpinner size="large" />);

  useEffect(() => {
    bridge.subscribe(({ detail: { type, data } }) => {
      if (type === 'VKWebAppUpdateConfig') {
        const schemeAttribute = document.createAttribute('scheme');
        schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
        document.body.attributes.setNamedItem(schemeAttribute);
      }
    });
    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');
      user.token = await bridge.send('VKWebAppGetAuthToken', { app_id: 7646627, scope: '' });
      const res = await bridge.send('VKWebAppCallAPIMethod', {
        method: 'storage.get',
        request_id: '32test',
        params: {
          v: '5.124',
          key: 'testQuizAppScore',
          access_token: user.token.access_token,
        },
      });
      user.highscore = res?.response?.[0]?.value;
      setUser(user);
      setPopout(null);
    }

    fetchData();
  }, []);

  if (popout) return popout;

  return <Main fetchedUser={fetchedUser} />;
};

export default App;
