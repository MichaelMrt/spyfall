import React from 'react';
import { Col, Input, Label, Row } from 'reactstrap';
import { css } from 'emotion';
import Localized from 'components/Localized/Localized';
import { logEvent } from 'utils/analytics';
import { useConfigTime } from 'selectors/configTime';
import { useConfigSpyCount } from 'selectors/configSpyCount';
import { useTranslation } from 'react-i18next';
import { useConfigAutoStartTimer } from 'selectors/configAutoStartTimer';

import SpyIcon from 'components/SpyIcon/SpyIcon';

export const GameConfig = () => {
  const [t] = useTranslation();
  const [time, setTime] = useConfigTime();
  const [spyCount, setSpyCount] = useConfigSpyCount();
  const [autoStartTimer, setAutoStartTimer] = useConfigAutoStartTimer();
  const onChangeSpyCount = (count) => () => {
    logEvent('GAME_SET_SPIES', count);
    setSpyCount(count);
  };

  const onSetTime = (evt) => {
    const newTime = evt.target.value;
    logEvent('GAME_SET_TIME', newTime);
    setTime(newTime);
  };

  return (
    <>
      <Row className={`${styles.container} align-items-center justify-content-center`}>
        <Col>
          <Row className="align-items-center justify-content-center text-center">
            <Col xs="auto">
              <Input type="radio" name="single" checked={spyCount === 1} onChange={onChangeSpyCount(1)} />
              <SpyIcon />
            </Col>
            <Col xs="auto">
              <Input type="radio" name="double" checked={spyCount === 2} onChange={onChangeSpyCount(2)} />
              <SpyIcon />
              <SpyIcon />
            </Col>
          </Row>
        </Col>
        <Col>
          <Row className="align-items-center justify-content-center">
            <Col xs="auto" className="text-center">
              <Localized name="interface.timer" />
            </Col>
            <Col xs="auto" className="text-center">
              <Input type="select" name="select" id="timer" value={time} onChange={onSetTime}>
                <option value="360">6:00</option>
                <option value="420">7:00</option>
                <option value="480">8:00</option>
                <option value="540">9:00</option>
                <option value="600">10:00</option>
              </Input>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className={`${styles.container} align-items-center justify-content-center`}>
        <Col xs="auto" className="text-center">
          <Label check className={styles.check}>
            <Input type="checkbox" checked={autoStartTimer} onChange={() => setAutoStartTimer(!autoStartTimer)} />
            {t('interface.auto_start_timer')}
          </Label>
        </Col>
      </Row>
    </>
  );
};

const styles = {
  container: css({
    marginTop: 20,
  }),
  check: css({
    cursor: 'pointer',
  }),
};

export default React.memo(GameConfig);
