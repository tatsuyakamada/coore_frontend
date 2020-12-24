import React, { useContext } from 'react';
import { Alert } from 'react-bootstrap';

import { Info } from '../../reducers/information';
import { InfoContext } from '../pages/Layout';

const Infomation: React.FC = () => {
  const { infos, infoDispatch } = useContext(InfoContext);

  const handleClose = (): void => infoDispatch({ type: 'reset' });

  const errors = infos.filter((info) => (info.type === 'error'));
  const infomations = infos.filter((info) => (info.type === 'info'));

  const Content = (type: 'info' | 'error', items: Info[]) => (
    <Alert
      variant={type === 'info' ? 'success' : 'danger'}
      onClose={handleClose}
      dismissible
      style={{ fontSize: 14 }}
    >
      {
        items.map((item) => (
          <div id={item.status.toString()}>{`${item.message}`}</div>
        ))
      }
    </Alert>
  );

  return (
    <>
      {errors.length > 0 && Content('error', errors)}
      {infomations.length > 0 && Content('info', infomations)}
    </>
  );
};

export default Infomation;
