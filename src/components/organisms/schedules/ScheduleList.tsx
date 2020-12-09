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
        mappedItem<ScheduledMenu>(scheduledMenus, columns || 4).map((mappedSchedules) => (
          <Row>
            {
              mappedSchedules.map((scheduledMenu) => (
                <Col className={`col-${columns ? 12 / columns : 3}`}>
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
