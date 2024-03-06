import React from 'react';
import OneCard from '../card/card.component';
import './cardList.styles.css';
const CardList = props => {
  return (
    <div className='card-list'>
      {props?.Cards?.map(item => {
        return <OneCard monsters={item} />;
      })}
    </div>
  );
};

export default CardList;
