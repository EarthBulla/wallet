
import React, { useState } from 'react';
import styles from './index.scss';

import Header from '~components/Header';

import { RouteComponentProps, withRouter } from 'react-router';
import clsx from 'clsx';
import ICON_EARTH from '~assets/images/icon-512.png';

interface Props extends RouteComponentProps<{ address: string }> {
}


const Stake = ({
  match: {
    params: { address },
  },
}: Props) => {

  console.log(address);
  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  const [tab, setTab] = useState<number>(0);

  return (
    <div className={styles.page}>
      <Header
        type={'wallet'}
        text={'Stake EARTH'}
      ><div className={styles.empty} /></Header>
      <div className={styles.statsCont}>
        <div className={styles.statsCol}>
          <div className={styles.statKey}>
            APY
          </div>
          <div className={styles.statVal}>
            132.3
          </div>
        </div>
        <div className={styles.statsCol}>
          <div className={styles.statKey}>
            Value Locked
          </div>
          <div className={styles.statVal}>
            $1,654,523
          </div>
        </div>
      </div>
      <div className={styles.tabs}>
        <div
          onClick={() => setTab(0)}
          className={clsx(styles.tab, tab === 0 && styles.tab_active)}>
          Stake
        </div>
        <div
          onClick={() => setTab(1)}
          className={clsx(styles.tab, tab === 1 && styles.tab_active)}>
          Unstake
        </div>
      </div>
      <div className={styles.tabcont}>
        <div className={styles.label}>
          Available to Stake
        </div>
        <div className={styles.inforow}>
          <div className={styles.infocolleft}>
            <img className={styles.eicon} src={ICON_EARTH}></img>
            <div className={styles.symbol}>Earth</div>
          </div>
          <div className={styles.infocolright}>1337</div>
        </div>
        <div className={styles.inputCont}>
          <input
            autoCapitalize='off'
            autoCorrect='off'
            autoFocus={false}
            className={clsx(styles.recipientAddress, styles.earthinput)}
            key={'price'}
            max="1.00"
            min="0.00"
            onChange={(e) => setSelectedAmount(parseFloat(e.target.value))}
            placeholder="price up to 8 decimal places"
            required
            step="0.001"
            type="number"
            value={selectedAmount}
          />
          <div className={clsx(styles.inputBtn)}>Stake</div>
          <div className={styles.maxBtn}>Max</div>
        </div>
      </div>


      <div className={styles.stats}>
        <div className={styles.row}>
          <div className={styles.col}>
            <div className={styles.key}>Staked</div>
            <div className={styles.val}>0</div>
          </div>
          <div className={styles.col}>
            <div className={styles.key}>Next Reward Amount</div>
            <div className={styles.val}>0</div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.col}>
            <div className={styles.key}>Staked</div>
            <div className={styles.val}>0</div>
          </div>
          <div className={styles.col}>
            <div className={styles.key}>Next Reward Amount</div>
            <div className={styles.val}>0</div>
          </div>
        </div>
      </div>

    </div>
  );
};


export default withRouter(Stake);