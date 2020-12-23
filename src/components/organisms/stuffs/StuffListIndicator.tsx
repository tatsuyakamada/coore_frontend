import React, { useContext } from 'react';
import { Accordion, ListGroup } from 'react-bootstrap';
import styled from 'styled-components';

import { StuffRelations } from '../../../interfaces/domains/stuff';
import { LayerColor } from '../../../utils/colors';
import EditIcon from '../../atoms/EditIcon';
import { StuffContext } from '../../pages/stuffs/index';

type Props = {
  element: StuffRelations;
  parent?: StuffRelations[];
  recursiveCount?: number;
}

const ListIndicator: React.FC<Props> = (props) => {
  const { element, parent, recursiveCount } = props;

  const level: number = recursiveCount || 0;

  const {
    categoryDispatch,
    subCategoryDispatch,
    stuffDispatch,
    stuffRelationModalDispatch,
  } = useContext(StuffContext);

  const listColor = (): React.CSSProperties => {
    switch (level) {
      case 0:
      case 1:
      case 2:
        return { backgroundColor: LayerColor[level] };
      default:
        return { backgroundColor: '#fff' };
    }
  };

  const handleCategoryEdit = (): void => {
    categoryDispatch({
      type: 'edit',
      category: {
        id: element.id,
        name: element.name,
      },
    });
    stuffRelationModalDispatch({ type: 'category' });
  };

  const handleSubCategoryEdit = (): void => {
    subCategoryDispatch({
      type: 'edit',
      subCategory: {
        id: element.id,
        name: element.name,
        category: ancestor[0],
      },
    });
    stuffRelationModalDispatch({ type: 'sub_category' });
  };

  const handleStuffEdit = (): void => {
    stuffDispatch({
      type: 'edit',
      stuff: {
        id: element.id,
        category: ancestor[0],
        subCategory: ancestor[1],
        name: element.name,
      },
    });
    stuffRelationModalDispatch({ type: 'stuff' });
  };

  const handleEdit = (event: React.MouseEvent<HTMLInputElement>): void => {
    switch (element.type) {
      case 'category':
        handleCategoryEdit();
        event.stopPropagation();
        break;
      case 'subCategory':
        handleSubCategoryEdit();
        event.stopPropagation();
        break;
      case 'stuff':
        handleStuffEdit();
        event.stopPropagation();
        break;
      default:
        break;
    }
  };

  const ancestor = parent ? [...parent, element] : [element];

  return (
    <>
      <Accordion.Toggle as={ListItem} eventKey={element.id.toString()} key={element.id}>
        <Content style={{ ...listColor() }}>
          <Label style={{ paddingLeft: `${20 * level}px` }}>{element.name}</Label>
          <EditIcon onClick={handleEdit} style={{ marginLeft: 'auto' }} />
        </Content>
      </Accordion.Toggle>
      {
        element.childs
        && (
          <Accordion.Collapse eventKey={element.id.toString()}>
            <Accordion>
              {
                element.childs.map((child) => (
                  <ListIndicator
                    key={child.id}
                    element={child}
                    parent={[...ancestor]}
                    recursiveCount={level + 1}
                  />
                ))
              }
            </Accordion>
          </Accordion.Collapse>
        )
      }
    </>
  );
};

const ListItem = styled(ListGroup.Item)({
  margin: 0,
  padding: 0,
});

const Content = styled.div({
  display: 'flex',
  height: '100%',
  width: '100%',
  margin: 0,
  padding: '12px 20px',
  alignItems: 'center',
});

const Label = styled.p({
  margin: 0,
});

export default ListIndicator;
