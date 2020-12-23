import React, { useContext } from 'react';
import { Form, FormControl } from 'react-bootstrap';
import styled from 'styled-components';

import { DeviceContext } from '../pages/Layout';

type Props = {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
}

const FormInput: React.FC<Props> = (props) => {
  const {
    label, value, onChange, style, labelStyle,
  } = props;

  const { isMobile } = useContext(DeviceContext);

  const formStyle: React.CSSProperties = { padding: isMobile ? '0' : '0 16px', ...style };

  return (
    <Form.Group style={{ ...formStyle }}>
      <Label style={{ ...labelStyle }}>{label}</Label>
      <FormControl
        placeholder={label}
        alia-label={label}
        aria-describedby={label}
        value={value}
        onChange={onChange}
      />
    </Form.Group>
  );
};

const Label = styled(Form.Label)({
  display: 'block',
});

export default FormInput;
