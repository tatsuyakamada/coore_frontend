import React, { useState } from 'react';

import { ScheduleCategory } from '../../interfaces/domains/schedule';
import SelectableScheduleBadge from '../atoms/SelectableScheduleBadge';

type Props = {
  onClick: (category: ScheduleCategory) => void;
}

const MultiScheduleCategorySelector: React.FC<Props> = (props) => {
  const { onClick } = props;

  const [dinner, setDinner] = useState<boolean>(true);
  const [lunch, setLunch] = useState<boolean>(true);
  const [morning, setMorning] = useState<boolean>(true);
  const [brunch, setBrunch] = useState<boolean>(true);

  const handleClick = (category: ScheduleCategory): void => {
    switch (category) {
      case 'dinner':
        setDinner(!dinner);
        break;
      case 'lunch':
        setLunch(!lunch);
        break;
      case 'morning':
        setMorning(!morning);
        break;
      case 'brunch':
        setBrunch(!brunch);
        break;
      default:
        break;
    }
    onClick(category);
  };

  return (
    <>
      <SelectableScheduleBadge category="dinner" selected={dinner} onClick={handleClick} />
      <SelectableScheduleBadge category="lunch" selected={lunch} onClick={handleClick} />
      <SelectableScheduleBadge category="morning" selected={morning} onClick={handleClick} />
      <SelectableScheduleBadge category="brunch" selected={brunch} onClick={handleClick} />
    </>
  );
};

export default MultiScheduleCategorySelector;
