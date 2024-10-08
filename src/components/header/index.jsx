import { useContext } from 'react';

import ProgressBar from 'react-bootstrap/ProgressBar';
import { BsChevronLeft } from "react-icons/bs";

import './Header.scss';

import { StoreContext } from '../../context/StoreContext';

const Header = () => {
  const { handleBackToLevel, activeOrder } = useContext(StoreContext);
  return (
    <div className='header'>
      <div className='header-order'>
        { activeOrder > 1 && <div className="order-back" onClick={handleBackToLevel}><BsChevronLeft /></div> }
        <div className="order-active">{activeOrder}</div>
        <div className="order-delimiter">/</div>
        <div className="order-total">5</div>
      </div>
      <ProgressBar now={(activeOrder/5) * 100} />
    </div>
  )
}

export default Header