import React, { useContext, useState } from 'react';
import { Col, FormControl, Row } from 'react-bootstrap';
import styled from 'styled-components';

import { Dish, Genre } from '../../../interfaces/domains/dish';
import { DishContext } from '../../../pages/dishes';
import mappedItem from '../../../utils/mappedItem';
import MultipleGenreSelector from '../../molecules/MultiGenreSelector';
import SearchBar from '../../molecules/SearchBar';

import DishCard from './DishCard';

const DishList: React.FC = () => {
  const { dishes } = useContext(DishContext);

  const [selectedGenre, setSelectedGenre] = useState<Genre[]>(['japanese', 'western', 'chinese', 'other']);
  const [word, setWord] = useState<string | null>(null);

  const filteredDishes = (): Dish[] => (
    dishes.filter((dish) => (
      selectedGenre.includes(dish.genre) && (word ? dish.name.indexOf(word) > -1 : true)
    ))
  );

  const handleClick = (genre: Genre): void => {
    const newSelectedGenre = selectedGenre;
    if (newSelectedGenre.includes(genre)) {
      setSelectedGenre(newSelectedGenre.filter((selected) => (selected !== genre)));
    } else {
      setSelectedGenre(newSelectedGenre.concat(genre));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => (
    setWord(event.target.value)
  );

  return (
    <>
      <SearchBar>
        <MultipleGenreSelector onClick={handleClick} />
        <NameForm
          placeholder="Name"
          alia-label="name"
          aria-describedby="name"
          onChange={handleChange}
        />
      </SearchBar>
      {
        mappedItem<Dish>(filteredDishes(), 4).map((mappedDishes) => (
          <Row>
            {
              mappedDishes.map((dish) => (
                <Col className="col-3">
                  <DishCard dish={dish} />
                </Col>
              ))
            }
          </Row>
        ))
      }
    </>
  );
};

const NameForm = styled(FormControl)({
  marginLeft: 30,
  width: 300,
  fontSize: 14,
});

export default DishList;
