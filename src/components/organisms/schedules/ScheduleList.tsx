import React from 'react';
import { Col, Row } from 'react-bootstrap';

import { ScheduledMenu } from '../../../interfaces/domains/schedule';
import mappedItem from '../../../utils/mappedItem';
import ScheduleCard from '../../molecules/ScheduleCard';

type Props = {
  scheduledMenus: ScheduledMenu[];
  columns?: number;
};

const ScheduleList: React.FC<Props> = (props) => {
  const { scheduledMenus, columns } = props;

  return (
    <>
      {
        mappedItem<ScheduledMenu>(scheduledMenus, columns || 1).map((mappedSchedules) => (
          <Row>
            {
              mappedSchedules.map((scheduledMenu) => (
                <Col>
                  <ScheduleCard
                    key={scheduledMenu.schedule.id}
                    scheduledMenu={scheduledMenu}
                  />
                </Col>
              ))
            }
          </Row>
        ))
      }
    </>
  );
};

export default ScheduleList;
