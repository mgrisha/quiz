import { useContext, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { StoreContext } from "../../context/StoreContext";

import styles from './Loader.module.scss';

const Loader = () => {
  const { percentage, setPercentage, activeOrder, setActiveOrder, setLoaderPage, setActiveButton, setMultiAnsw } = useContext(StoreContext);
  const radius = 126; // Радіус кола
  const stroke = 10; // Товщина лінії
  const normalizedRadius = radius - stroke * 2; // Нормалізуємо радіус для розміщення stroke
  const circumference = normalizedRadius * 2 * Math.PI; // Обчислюємо окружність кола
  const strokeDashoffset = circumference - (percentage / 100) * circumference; // Обчислюємо, на скільки скорочувати шлях
  const { t } = useTranslation();

  useEffect(() => {
    let progress = 0;
    const duration = 5000; // Загальний час 5 секунд
    const interval = 100; // Оновлювати кожні 100 мс
    const increment = (interval / duration) * 100; // Відсоток приросту

    const timer = setInterval(() => {
      progress += increment;
      setPercentage(Math.min(Math.round(progress), 100));
    }, interval);

    // Зупиняємо таймер після завершення
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (percentage === 100) {
      setActiveOrder(activeOrder + 1);
      setLoaderPage(false);
      setActiveButton(false);
      setMultiAnsw([]);
    }
  }, [percentage, activeOrder]);

  return (
    <div className={styles.loader}>
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="#e8eaf2"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="#e4229c"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + " " + circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          style={{
            transition: "stroke-dashoffset 0.5s ease",
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%", // Зміщуємо початок на верх
          }}
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className={styles['loader-circle__text']}
        >
          {percentage}%
        </text>
      </svg>
      <div className={styles['loader-text']}>{t('finding_collections_for_you')}</div>
    </div>
    
  );
};

export default Loader;