import { useEffect, useState, createContext } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
export const StoreContext = createContext(null);

export const typeOfInputs = {
  'single-select': 'radio',
  'single-select-image': 'radio',
  'multi-select': 'checkbox',
  'bubble': 'checkbox',
  'email': 'text'
};

export const quizes = {
  1: {
    title: 'what_is_your_preferred_language',
    subtitle: 'choose_language',
    selects: {
      type: 'single-select',
      name: 'radio',
      items: [
        {
          id: 1,
          caption: 'english',
          lang: 'en'
        },
        {
          id: 2,
          caption: 'french',
          lang: 'fr'
        },
        {
          id: 3,
          caption: 'german',
          lang: 'de'
        },
        {
          id: 4,
          caption: 'spanish',
          lang: 'es'
        }
      ]
    }
  },
  2: {
    title: 'what_gender_do_you_identify_with',
    subtitle: '',
    selects: {
      type: 'single-select-image',
      name: 'radio-image',
      items: [
        {
          id: 1,
          caption: 'male',
          image: '👨'
        },
        {
          id: 2,
          caption: 'female',
          image: '👩'
        }
      ]
    }
  },
  3: {
    title: 'what_is_your_age',
    subtitle: '',
    selects: {
      type: 'single-select',
      name: 'radio',
      items: [
        {
          id: 1,
          caption: '18_29_years'
        },
        {
          id: 2,
          caption: '30_39_years'
        },
        {
          id: 3,
          caption: '40_49_years'
        },
        {
          id: 4,
          caption: '50+'
        }
      ]
    }
  },
  4: {
    title: 'what_do_you_hate_the_most_in_a_book',
    subtitle: '',
    selects: {
      type: 'multi-select',
      name: 'checkbox',
      items: [
        {
          id: 1,
          caption: 'lack_of_logic'
        },
        {
          id: 2,
          caption: 'a_slow_speed'
        },
        {
          id: 3,
          caption: 'lack_of_humor'
        },
        {
          id: 4,
          caption: 'way_too_generic_ending'
        }
      ] 
    }
  },
  5: {
    title: 'what_are_your_favorite_topics',
    subtitle: 'choose_up_to_3_topics_you_like',
    selects: {
      type: 'bubble',
      name: 'checkbox-buble',
      items: [
        {
          id: 1,
          caption: 'werewolf',
          image: '🐺'
        },
        {
          id: 2,
          caption: 'romance',
          image: '🥰'
        },
        {
          id: 3,
          caption: 'action',
          image: '💃'
        },
        {
          id: 4,
          caption: 'billionaire',
          image: '🤑'
        },
        {
          id: 5,
          caption: 'young_adult',
          image: '💁‍♀️'
        },
        {
          id: 6,
          caption: 'bad_boy',
          image: '🤠'
        },
        {
          id: 7,
          caption: 'royal_obsession',
          image: '👑'
        }
      ]
    }
  },
  6: {
    title: 'email',
    subtitle: 'enter_your_email_to_get_full_access',
    // subtitle2: 'by_continuing_i_agree_with_privacy_policy_and_terms_of_use.',
    subtitle2: {
      sub2_0: 'by_continuing_i_agree_with',
      sub2_1: 'privacy_policy',
      sub2_2: 'and',
      sub2_3: 'terms_of_use',
    },
    selects: {
      type: 'email',
      name: 'input-text',
      items: [
        {
          id: 1,
          caption: 'your_email'
        }
      ]
    }
  }
};

const StoreContextProvider = (props) => {
  const { t } = useTranslation();
  const [activeOrder, setActiveOrder] = useState(1);
  const [answer, setAnswer] = useState({
    order: '',
    title: '',
    type: '',
    answer: []
  });
  const [answers, setAnswers] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [activeButton, setActiveButton] = useState(false);
  const [multiAnsw, setMultiAnsw] = useState([]);
  const [emailValue, setEmailValue] = useState('');
  const [emailError, setEmailError] = useState('');
  const [percentage, setPercentage] = useState(0);
  const [loaderPage, setLoaderPage] = useState(false);
  const [thanksPage, setThanksPage] = useState(false);

  const handleChangeAnswer = (e) => {
    const inputValue = e.target.value;
    if (quizes[activeOrder].selects.type === 'single-select' || quizes[activeOrder].selects.type === 'single-select-image') {
      const newAnswer = {
        order: activeOrder,
        title: quizes[activeOrder].title,
        type: quizes[activeOrder].selects.type,
        answer: [inputValue]
      }
      setAnswer(newAnswer);
      setAnswers([...answers, newAnswer]);
      setTimeout(function () {
        setActiveOrder(activeOrder + 1);
        setIsLoader(true);
      }, 100);
      setTimeout(function () {
        setIsLoader(false);
        if (activeOrder === 1) {
          const lang = quizes[activeOrder].selects.items.find(item => t(item.caption) === inputValue).lang;
          i18n.changeLanguage(lang);
        }
      }, 300);
    } else if (quizes[activeOrder].selects.type === 'multi-select' || quizes[activeOrder].selects.type === 'bubble') {
      if (e.target.checked) {
        setMultiAnsw([...multiAnsw, inputValue]);
      } else {
        setMultiAnsw(prevAnsw => prevAnsw.filter(answr => answr !== inputValue));
      }
    }
  }

  const isValidEmail = (email) => {
    let patternEmail = /^(([a-zA-Z0-9&+-=_])+((\.([a-zA-Z0-9&+-=_]){1,})+)?){1,64}@([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/;
    return patternEmail.test(email)
  }

  const handleBlurEmail = () => {
    if (!isValidEmail(emailValue)) {
      setEmailError(t('invalid_email'));
    } else {
      setEmailError('');
    }
  }

  const handleChangeEmailValue = (e) => {
    if (!isValidEmail(e.target.value)) {
      setEmailError(t('invalid_email'));
      setActiveButton(false);
    } else {
      setEmailError('');
      setActiveButton(true);
    }
    setEmailValue(e.target.value);
  }

  useEffect(() => {
    if (document.querySelector('.quiz-next') && (quizes[activeOrder].selects.type === 'multi-select' || quizes[activeOrder].selects.type === 'bubble')) {
      if (multiAnsw.length > 0) {
        setActiveButton(true);
      } else {
        setActiveButton(false);
      }
    }
  }, [multiAnsw, activeOrder]);

  const handleBackToLevel = () => {
    setAnswers(prevAnswers => prevAnswers.filter(answ => answ.order !== (activeOrder - 1)));
    setActiveOrder(activeOrder - 1);
  }

  const handleClickButtonNext = () => {
    if (multiAnsw.length > 0) {
      const newAnswer = {
        order: activeOrder,
        title: quizes[activeOrder].title,
        type: quizes[activeOrder].selects.type,
        answer: multiAnsw
      }
      setAnswers([...answers, newAnswer]);
      if (quizes[activeOrder].selects.type === 'bubble') {
        setLoaderPage(true);
      } else {
        setTimeout(function () {
          setActiveOrder(activeOrder + 1);
          setIsLoader(true);
        }, 100);
        setTimeout(function () {
          setIsLoader(false);
          setMultiAnsw([]);
          setActiveButton(false);
        }, 300);
        setLoaderPage(false);
      }
    } else if (emailValue.length > 0 && emailError.length === 0 && activeButton) {
      const newAnswer = {
        order: activeOrder,
        title: quizes[activeOrder].title,
        type: quizes[activeOrder].selects.type,
        answer: [emailValue]
      }
      setAnswers([...answers, newAnswer]);
      setThanksPage(true);
    }
  }

  const handleClickRetakeQuiz = () => {
    setAnswers([]);
    setActiveOrder(1);
    setActiveButton(false);
    setLoaderPage(false);
    setThanksPage(false);
    setAnswer({
      order: '',
      title: '',
      type: '',
      answer: []
    });
    setMultiAnsw([]);
    setEmailValue('');
    setEmailError('');
    setIsLoader(false);
    setPercentage(0);
  }

  const contextValue = {
    activeOrder,
    setActiveOrder,
    answer,
    setAnswer,
    answers,
    setAnswers,
    handleChangeAnswer,
    handleBackToLevel,
    isLoader,
    activeButton,
    handleClickButtonNext,
    handleChangeEmailValue,
    emailValue,
    emailError,
    isValidEmail,
    handleBlurEmail,
    percentage,
    setPercentage,
    thanksPage,
    loaderPage,
    setLoaderPage,
    handleClickRetakeQuiz,
    setActiveButton,
    setMultiAnsw
  }

  return (
    <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>
  )
}

export default StoreContextProvider;