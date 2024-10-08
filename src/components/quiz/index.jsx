import { useTranslation } from 'react-i18next';
import { useContext } from "react";
import Header from "../header"

import SelectType from "../select-type";

import './Quiz.scss';

import { quizes, StoreContext } from "../../context/StoreContext";

const Quiz = () => {
  const { t } = useTranslation();

  const { activeButton, activeOrder, handleClickButtonNext, emailError, emailValue } = useContext(StoreContext);

  const activeQuiz = quizes[activeOrder];

  // console.log(activeQuiz.subtitle2.sub2_0);
  // console.log(activeQuiz.subtitle2.sub2_1);
  // console.log(t(activeQuiz.subtitle2.sub2_0));
  // console.log(activeQuiz.subtitle2.length);

  return (
    <div className='quiz'>
      {
        activeOrder < 6 && <Header />
      }
      <div className="quiz-body">
        <div className="quiz-title">{t(activeQuiz.title)}</div>
        {
          activeQuiz.subtitle?.length > 0 && <div className="quiz-subtitle">{t(activeQuiz.subtitle)}</div>
        }
        <div className={`quiz-selects quiz-selects__${activeQuiz.selects.type}`}>
        {
          activeQuiz.selects.items?.length > 0 && activeQuiz.selects.items.map(({ caption, id, image }) => (
            <SelectType caption={t(caption)} key={id} image={image} />
          ))
        }
        {
          (activeQuiz.subtitle2?.length > 0 || (activeQuiz.hasOwnProperty('subtitle2') && Object.keys(activeQuiz.subtitle2).length)) && (activeQuiz.selects.type === 'email' ? 
            <div className="quiz-subtitle-additional">
              <span>{t(activeQuiz.subtitle2.sub2_0)}</span>&nbsp;
              <span className="color-pink">{t(activeQuiz.subtitle2.sub2_1)}</span>&nbsp;
              <span>{t(activeQuiz.subtitle2.sub2_2)}</span>&nbsp;
              <span className="color-pink">{t(activeQuiz.subtitle2.sub2_3)}</span>
            </div>
           : <div className="quiz-subtitle-additional">{t(activeQuiz.subtitle2)}</div>)
        }
        </div>
        {(activeQuiz.selects.type === 'multi-select' || activeQuiz.selects.type === 'bubble' || activeQuiz.selects.type === 'email') && <div className={`quiz-next${(!activeButton && (emailError.length > 0 || emailValue.length == 0)) ? ' is-disable' : ''}`} onClick={handleClickButtonNext}>{t('next')}</div>}
      </div>
    </div>
  )
}

export default Quiz