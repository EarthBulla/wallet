import React from 'react';
import MarketplaceCard from '~components/MarketplaceCard';
import styles from "./index.scss";
//import img from "~assets/images/marketplaceImg.svg";
import Header from '~components/Header';
import { LIVE_ICP_NFT_LIST } from '~global/nfts';
import { keyable } from '~scripts/Background/types/IMainController';
import { RouteComponentProps, useHistory, withRouter } from 'react-router-dom';

interface Props extends RouteComponentProps<{ address: string }> {
    className?: string;
}

const NFTMarketplace = ({
    match: {
        params: {
            address,
        },
    },
}: Props) => {
    const history = useHistory();
    return (
        <div className={styles.page}>
            <Header
                className={styles.header}
                showMenu
                type={'wallet'}
                text={'💎  Explore NFTs'}
            ><div className={styles.empty} /></Header>
            <div className={styles.mainContainer}>
                {LIVE_ICP_NFT_LIST.map((nftObj: keyable) => <div
                    key={nftObj.id}
                    className={styles.nft}
                    onClick={() => history.push(`/nft/collection/${nftObj.id}?address=${address}`)}
                >
                    <MarketplaceCard
                        img={nftObj.icon}
                        text={nftObj.name}
                        priceText={"Floor Price"}
                        price={"$350"}
                        volumeText={"Volume"}
                        volPrice={"$133M"}
                    /></div>)}


            </div>
        </div>
    )
}

export default withRouter(NFTMarketplace)
