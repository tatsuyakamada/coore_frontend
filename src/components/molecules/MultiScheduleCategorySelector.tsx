import React from 'react';

import { ScheduleCategories } from '../../enum/schedule_category';
import { isScheduleCategory, ScheduleCategory } from '../../interfaces/domains/schedule';
import SelectableScheduleBadge from '../atoms/SelectableScheduleBadge';

type Props = {
  categories: ScheduleCategory[];
  onClick: (category: ScheduleCategory) => void;
};

const MultiScheduleCategorySelector: React.FC<Props> = (props) => {
  const { categories, onClick } = props;

  const selected = (category: ScheduleCategory): boolean => (
    categories.includes(category)
  );

  return (
    <>
      {
        Object.keys(ScheduleCategories).map((category) => (
          isScheduleCategory(category)
          && (
            <SelectableScheduleBadge
              key={category}
              category={category}
              selected={selected(category)}
              onClick={onClick}
            />
          )
        ))
      }
    </>
  );
};

export default MultiScheduleCategorySelector;
