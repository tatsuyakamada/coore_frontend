import React, { useContext } from 'react';
import { Form } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import styled from 'styled-components';

import { DeviceContext } from '../pages/Layout';

type Props = {
  label?: string;
  ref: React.RefObject<Typeahead<SelectItem>>;
  onChange: (selected: SelectItem[], event?: React.MouseEvent<HTMLSpanElement>) => void;
  onInputChange: () => void;
  options: SelectItem[];
  selected?: SelectItem[];
  placeholder?: string;
  onFocus?: (event: Event) => void;
  style?: React.CSSProperties;
}

export type SelectItem = {
  id: number;
  name: string;
  selectable?: boolean;
}

const AutoFillSelector: React.FC<Props> = (props) => {
  const {
    label, ref, onChange, onInputChange, options, selected, placeholder, onFocus, style,
  } = props;

  const { isMobile } = useContext(DeviceContext);

  const formStyle: React.CSSProperties = { padding: isMobile ? '0' : '0 16px', ...style };

  const handleFocus = (event: Event): void => {
    if (onFocus) onFocus(event);
  };

  return (
    <Form.Group style={{ ...formStyle }}>
      {label && <Label>{label}</Label>}
      <Typeahead
        id="subCategory"
        ref={ref}
        onChange={onChange}
        onInputChange={onInputChange}
        options={options}
        selected={selected}
        onFocus={handleFocus}
        placeholder={placeholder}
        labelKey="name"
      />
    </Form.Group>
  );
};

const Label = styled(Form.Label)`
  display: block,
`;

export default AutoFillSelector;
