import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import './SelectType.scss';

// const typeInputs = [
//   { 'single-select': 'radio' },
//   { 'single-select-image': 'radio' },
//   { 'multi-select': 'checkbox' },
//   { 'bubble': 'checkbox' },
// ]

import { StoreContext, quizes, typeOfInputs } from '../../context/StoreContext';

const SelectType = ({ caption, image = '' }) => {
  const { handleChangeAnswer, activeOrder, handleChangeEmailValue, emailValue, emailError, handleBlurEmail } = useContext(StoreContext);
  const { t } = useTranslation();

  const activeQuiz = quizes[activeOrder]
  const typeInput = typeOfInputs[activeQuiz.selects.type];
  const typeSelect = activeQuiz.selects.type;
  const inputID = typeSelect === 'multi-select' || typeSelect === 'bubble' ? (caption.toLowerCase()).replaceAll(' ', '_') : caption.toLowerCase();

  return (
    <>
      <div className={`select-group select-group__${typeSelect}`}>
      {
        typeSelect !== 'email' ? (
          <>
            <input
              type={typeInput}
              id={inputID}
              name={`group-${activeOrder}`}
              value={caption}
              onChange={(e) => handleChangeAnswer(e)}
            />
            <label htmlFor={inputID}>
              {
                image.length > 0 && (<span className="image">{image}</span>)
              }
              <span>{caption}</span>
            </label>
          </>
        ) : (
          <>
            <input
              type={typeInput}
              id={inputID}
              name={`group-${activeOrder}`}
              value={emailValue}
              placeholder={caption}
              onChange={(e) => handleChangeEmailValue(e)}
              className={`select-group__email-input${emailError.length > 0 ? ' is-error' : ''}`}
              onBlur={handleBlurEmail}
            />
            { emailError.length > 0 && <span className={`select-group__email-error${emailError.length > 0 ? ' is-error' : ''}`}>{emailError}</span> }
          </>
        )
      }
      </div>
    </>
  )
}

export default SelectType;
