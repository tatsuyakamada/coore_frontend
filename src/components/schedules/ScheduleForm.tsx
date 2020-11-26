import React, { useState, useContext, ReactText } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { BiImages } from 'react-icons/bi';
import DatePicker, { DayValue } from 'react-modern-calendar-datepicker';
import styled from 'styled-components';

import ScheduleCategory from '../../enum/schedule_category';
import { FormProps } from '../../interfaces/domains/utils';
import RadioSelector from '../RadioSelector';

import { ScheduleContext } from './CreateForm';

const ScheduleForm: React.FC = () => {
  const { schedule, scheduleDispatch } = useContext(ScheduleContext);

  const initialDate = {
    year: schedule.date.getFullYear(),
    month: schedule.date.getMonth() + 1,
    day: schedule.date.getDate(),
  };

  const [selectedDay, setSelectedDay] = useState<DayValue>(initialDate);

  const handleDateSelect = (value: DayValue | null): void => {
    setSelectedDay(value);
    const date = value ? new Date(value.year, value.month - 1, value.day) : schedule.date;
    scheduleDispatch({ type: 'date', value: date });
  };

  type RefProps = {
    ref: React.RefObject<HTMLElement>;
  };

  const renderCustomInput = ({ ref }: RefProps): React.ReactElement => (
    <DateSelector
      ref={ref}
      value={schedule.date.toLocaleDateString()}
      readOnly
      style={{ backgroundColor: 'white' }}
    />
  );

  const handleCategorySelect = (value: ReactText): void => {
    scheduleDispatch({ type: 'category', value: value.toString() });
  };

  const handleMemoInput = (event: React.FormEvent<FormProps>): void => {
    scheduleDispatch({ type: 'memo', value: event.currentTarget.value });
  };

  const handleImagesSelect = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files !== null && event.target.files.length > 0) {
      scheduleDispatch({ type: 'images', value: event.target.files });
    }
  };

  return (
    <Form.Group>
      <Form.Label style={{ fontWeight: 'bold' }}>Schedule</Form.Label>
      <FormItem style={{ marginBottom: 8 }}>
        <Label>Date</Label>
        <DatePicker
          value={selectedDay}
          onChange={handleDateSelect}
          renderInput={renderCustomInput} // render a custom input
          shouldHighlightWeekends
        />
      </FormItem>
      <FormItem style={{ marginBottom: 8 }}>
        <Label>Category</Label>
        <RadioSelector
          options={ScheduleCategory}
          onChange={handleCategorySelect}
          selected="dinner"
        />
      </FormItem>
      <FormItem>
        <Label>Memo</Label>
        <Form.Control as="textarea" rows={3} onChange={handleMemoInput} type="text" />
      </FormItem>
      <FormItem>
        <InputGroup>
          <Form.Label>Images</Form.Label>
          <UploadIcon>
            <label
              htmlFor="images"
              style={{ marginTop: -8 }}
            >
              <BiImages style={{ width: '25px', height: '25px' }} />
              <input
                id="images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImagesSelect}
                hidden
              />
            </label>
          </UploadIcon>
        </InputGroup>
        {
          schedule.images
          && (
            <div>
              {
                Array.from(schedule.images).map((image, index) => (
                  <ImageItem id={`image-${index}`}>{image.name}</ImageItem>
                ))
              }
            </div>
          )
        }
      </FormItem>
    </Form.Group>
  );
};

const FormItem = styled(Form.Group)({
  padding: '0 16px',
});

const Label = styled(Form.Label)({
  display: 'block',
});

const DateSelector = styled(Form.Control)({
  width: '118%',
});

const UploadIcon = styled.span({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 10,
  color: '#509aea',
  cursor: 'pointer',
});

const ImageItem = styled.li({
  fontSize: 14,
});

export default ScheduleForm;
