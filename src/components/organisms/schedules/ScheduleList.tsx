import React, { useContext } from 'react';
import { Col, Row } from 'react-bootstrap';

import { ScheduledMenu } from '../../../interfaces/domains/schedule';
import { ScheduledMenuContext } from '../../../pages/schedules/index';
import mappedItem from '../../../utils/mappedItem';
import ScheduleCard from '../../molecules/ScheduleCard';

const ScheduleList: React.FC = () => {
  const { scheduledMenus } = useContext(ScheduledMenuContext);

  return (
    <div>
      {
        mappedItem<ScheduledMenu>(scheduledMenus, 4).map((mappedSchedules) => (
          <Row>
            {
              mappedSchedules.map((scheduledMenu) => (
                <Col className="col-3">
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
    </div>
  );
};

export default ScheduleList;
