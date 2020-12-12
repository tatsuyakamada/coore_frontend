import React from 'react';

import { MenuCategories } from '../../enum/scheduled_menu_category';
import { isMenuCategory, MenuCategory } from '../../interfaces/domains/menu';
import SelectableMenuBadge from '../atoms/SelectableMenuBadge';

type Props = {
  categories: MenuCategory[];
  onClick: (category: MenuCategory) => void;
}

const MultipleMenuCategorySelector: React.FC<Props> = (props) => {
  const { categories, onClick } = props;

  const selected = (category: MenuCategory): boolean => categories.includes(category);

  return (
    <>
      {
        Object.keys(MenuCategories).map((category) => (
          isMenuCategory(category) && (
            <SelectableMenuBadge
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

export default MultipleMenuCategorySelector;
