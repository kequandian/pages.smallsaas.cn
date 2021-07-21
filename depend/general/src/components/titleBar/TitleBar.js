import React from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { routerRedux } from 'dva/router'

import styles from './TitleBar.css';

import shareIcon from './icons/share-icon.png';
import collectionOn from './icons/collectionOn-icon.png';
import collectionOff from './icons/collectionOff-icon.png';

import CollectionCom from './collectionComponent/Index';

const TitleBar = ({
  title,
  children,
  showActions=false,
  onShareAction=()=>{},
  addCollection=()=>{},
  onGoBack,
  custGBClick,
  isCollection=false,
}) => {

  // console.log('uuuuu custGBClick = ',custGBClick);

  let actionList = [];

  if(showActions){
    actionList = [
      // <img key="1" src={isCollection?collectionOn:collectionOff} className={styles.imgCss} style={{ marginRight: '10px'}}  onClick={() => addCollection()}/>,
      <CollectionCom key={1} onSwitch={() => addCollection()} status={isCollection === 1 ? true : false}/>,
      // <img key={2} src={shareIcon} className={styles.imgCss} onClick={() => onShareAction()}/>,
    ]
  }

  const onGBClick = () => {
    console.log('kkkkkkkkkk router.length ',    history)
    if(custGBClick) {
      custGBClick()
    } else {
      if(history.length === 1){
        routerRedux.push({pathname: '/skinHousekeeper'});
      }
      if(history.length > 1) {
        routerRedux.goBack()
      }
      if(onGoBack) {
        onGoBack()
      }
    }
  }

  return(
    <div className={styles.style}>
      <div className={styles.titleContainer}>
        <NavBar
          mode="light"
          icon={<Icon type="left" style={{ color:"#000" }} />}
          onLeftClick={() => onGBClick() }
          rightContent={actionList}
        >{title}</NavBar>
      </div>
      <div className={ styles.contentBox }>
        { children }
      </div>
    </div>
  )
}

export default TitleBar;
