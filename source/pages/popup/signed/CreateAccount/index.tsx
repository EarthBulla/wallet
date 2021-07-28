/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
/* eslint-disable camelcase */

import React, { useState } from 'react';
import styles from './index.scss';
//import { saveAs } from 'file-saver';
//import { useHistory } from 'react-router-dom';
//import BG_MNEMONIC from '~assets/images/bg_mnemonic.png';
import ICON_CHECKED from '~assets/images/icon_checkbox_checked.svg';
import ICON_UNCHECKED from '~assets/images/icon_checkbox_unchecked.svg';
import ICON_COPY from '~assets/images/icon_copy.svg';
import CopyToClipboard from 'react-copy-to-clipboard';
//import Loading from '~components/Loading';
import NextStepButton from '~components/NextStepButton';
import HeaderWithSteps from '~components/HeaderWithSteps';
import Password from '~components/Password';
import clsx from 'clsx';


const Page = () => {
  const [isBusy, setIsBusy] = useState(false);
  const [checked, setChecked] = useState(false);
  const [secondChecked, setSecondChecked] = useState(false);
  //const { setSelectedAccount } = useContext(SelectedAccountContext);

  const [step, setStep] = useState(1);
  const [account, setAccount] = useState<null | { address: string; seed: string }>({ address: '5xxxx', seed: "twinkle twinkle little star" });
  //const type = 'DEFAULT_TYPE';
  const [name, setName] = useState('');
  //const [password, setPassword] = useState<string | null>(null);
  console.log(setStep, setAccount, setIsBusy);
  //const history = useHistory();

  //const genesis = "ICP";

  //const show = console.log;
  const _onCopy = () => console.log();



  //const _onCreate = () => console.log();;

  const backupKeystore = () => console.log();

  //const _onNextStep= () => console.log();
  const _onPreviousStep = () => console.log();

  return <div
    className={styles.page}
  >
    <HeaderWithSteps backOverride={step === 1 ? undefined : _onPreviousStep}
      step={step}
      text={('Create an account')}
    />{account &&
      (step === 1
        ? (
          <div>
            <div className={styles.earthInputCont}>
              <div className={styles.labelText}>Account name {name}{isBusy}</div>
              <input
                autoCapitalize='off'
                autoCorrect='off'
                autoFocus={true}
                className={clsx(styles.earthName, styles.earthInput)}
                onChange={(e) => setName(e.target.value)}
                placeholder="REQUIRED"
                required
              />
            </div>
            <div
              className={clsx(styles.earthInputCont, styles.mnemonicInputCont)}
            >
              <div className={styles.labelText}>Mnemonic Seed</div>
              <div className={styles.mnemonicContWrap}>
                <div className={styles.mnemonicCont}>
                  {account.seed.split(' ').map((word, index) => <div className='{styles.mnemonicWords'
                    key={index}>
                    {word}
                  </div>)}
                  <div className={styles.mnemonicActionsCont}>
                    <CopyToClipboard
                      text={account.seed || ''}
                    >
                      <div
                        className={styles.mnemonicAction}
                        onClick={_onCopy}><img className={styles.mnemonicActionIcon}
                          src={ICON_COPY} />
                        <div>COPY</div>
                      </div>
                    </CopyToClipboard>

                    <div className={styles.mnemonicAction}
                      onClick={() => backupKeystore()}>
                      <img className={styles.mnemonicActionIcon}
                        src={ICON_COPY} />
                      <div>DOWNLOAD</div>
                    </div>
                  </div>
                </div>
                <div className={styles.mnemonicHelp}>
                  <div className={styles.mnemonicHelpTitle}>
                    This is a generated 12-word mnemonic seed.
                  </div>
                </div>
              </div>
              <div className={styles.checkboxCont}>
                {checked
                  ? <img
                    className={styles.checkboxIcon}
                    onClick={() => setChecked(false)}
                    src={ICON_CHECKED} />
                  : <img
                    className={styles.checkboxIcon}
                    onClick={() => setChecked(true)}
                    src={ICON_UNCHECKED} />
                }

                <div className={styles.checkboxTitle}>I have saved my mnemonic seed safely.</div>
              </div>
              <div className={styles.nextCont}>
                <NextStepButton
                >
                  {('Next step')}
                </NextStepButton>
              </div>

            </div>
          </div>
        )
        : (
          <>
            <div
              className={clsx(styles.earthInputCont, styles.earthInputContPassword)}
            >
              <Password 
              onChange={console.log}
              />
              <div className={styles.nextCont}>
                <div className={styles.checkboxCont}>
                  {secondChecked
                    ? <img
                      className={styles.checkboxIcon}
                      onClick={() => setSecondChecked(false)}
                      src={ICON_CHECKED} />
                    : <img
                      className={styles.checkboxIcon}
                      onClick={() => setSecondChecked(true)}
                      src={ICON_UNCHECKED} />
                  }

                  <div className={styles.checkboxTitle}>I understand that I will lose access to the account if I lose this mnemonic phrase.</div>
                </div>
                <NextStepButton
                  disabled
                >
                  {'Create an Account'}
                </NextStepButton>
              </div>
            </div>
          </>
        ))}
  </div>;
};

export default Page;