import React, { useContext } from 'react';
import { Form } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import styled from 'styled-components';

import { DeviceContext } from '../pages/Layout';

type Props = {
  label: string;
  ref: React.RefObject<Typeahead<SelectItem>>;
  onChange: (selected: SelectItem[]) => void;
  onInputChange: () => void;
  options: SelectItem[];
  selected: SelectItem[];
  style?: React.CSSProperties;
}

export type SelectItem = {
  id: number;
  name: string;
}

const AutoFillSelector: React.FC<Props> = (props) => {
  const {
    label, ref, onChange, onInputChange, options, selected, style,
  } = props;

  const { isMobile } = useContext(DeviceContext);

  const formStyle: React.CSSProperties = { padding: isMobile ? '0' : '0 16px', ...style };

  return (
    <Form.Group style={{ ...formStyle }}>
      <Label>{label}</Label>
      <Typeahead
        id="subCategory"
        ref={ref}
        onChange={onChange}
        onInputChange={onInputChange}
        options={options}
        selected={selected}
        placeholder={label}
        labelKey="name"
      />
    </Form.Group>
  );
};

const Label = styled(Form.Label)`
  display: block,
`;

export default AutoFillSelector;
