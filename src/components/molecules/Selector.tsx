import React from 'react';
import { Form } from 'react-bootstrap';

type Props = {
  options: Option[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

type Option = {
  value: string | number;
  label: string;
};

const Selector: React.FC<Props> = (props) => {
  const { options, onChange } = props;

  return (
    <Form.Control as="select" onChange={onChange}>
      {
        options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))
      }
    </Form.Control>
  );
};

export default Selector;
