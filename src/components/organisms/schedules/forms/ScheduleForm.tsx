import React, { useContext, useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { BiImages } from 'react-icons/bi';
import DatePicker, { DayValue } from 'react-modern-calendar-datepicker';
import styled from 'styled-components';

import ScheduleCategoryOption from '../../../../enum/schedule_category';
import { FormProps } from '../../../../interfaces/domains/utils';
import DeleteIcon from '../../../atoms/DeleteIcon';
import ToggleSelector from '../../../molecules/ToggleSelector';
import { ScheduledMenuContext } from '../../../pages/schedules/index';

const ScheduleForm: React.FC = () => {
  const { schedule, scheduleDispatch } = useContext(ScheduledMenuContext);

  const scheduleDate = new Date(schedule.date);

  const initialDate: DayValue = (
    {
      year: scheduleDate.getFullYear(),
      month: scheduleDate.getMonth() + 1,
      day: scheduleDate.getDate(),
    }
  );

  const [selectedDay, setSelectedDay] = useState<DayValue>(initialDate);

  const handleDateSelect = (selectedDate: DayValue | null): void => {
    setSelectedDay(selectedDate);
    const date = selectedDate
      ? new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day)
      : schedule.date;
    scheduleDispatch({ type: 'date', value: date });
  };

  type RefProps = {
    ref: React.RefObject<HTMLElement>;
  };

  const renderCustomInput = ({ ref }: RefProps): React.ReactElement => (
    <DateSelector
      ref={ref}
      value={scheduleDate.toLocaleDateString()}
      readOnly
      style={{ backgroundColor: 'white' }}
    />
  );

  const handleCategorySelect = (category: string): void => (
    scheduleDispatch({ type: 'category', value: category })
  );

  const handleMemoInput = (event: React.FormEvent<FormProps>): void => (
    scheduleDispatch({ type: 'memo', value: event.currentTarget.value })
  );

  const handleImagesSelect = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files !== null && event.target.files.length > 0) {
      scheduleDispatch({ type: 'images', value: event.target.files });
    }
  };

  const handleImageDelete = (
    event: React.MouseEvent<HTMLSpanElement>, id: number, index: number,
  ): void => {
    scheduleDispatch({ type: 'deleteImages', value: id });
    const targetImage: HTMLElement | null = event.currentTarget.closest(`#delete-image-${index}`);
    if (targetImage !== null) targetImage.hidden = true;
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
        <ToggleSelector
          options={ScheduleCategoryOption}
          onChange={handleCategorySelect}
          selected={schedule.category}
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
          schedule.deleteImages
          && (
            <div>
              {
                Array.from(schedule.deleteImages).map((image, index) => (
                  <ImageItem id={`delete-image-${index}`}>
                    {image.name}
                    <DeleteIcon onClick={(event) => handleImageDelete(event, image.id, index)} />
                  </ImageItem>
                ))
              }
            </div>
          )
        }
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

const FormItem = styled(Form.Group)`
  padding: 0 16px;
`;

const Label = styled(Form.Label)`
  display: block;
`;

const DateSelector = styled(Form.Control)`
  width: 118%;
`;

const UploadIcon = styled.span`
  display: flex;
  align-items: center;
  margin-left: 10px;
  color: #509aea;
  cursor: pointer;
`;

const ImageItem = styled.li`
  display: flex;
  font-size: 14px;
`;

export default ScheduleForm;
