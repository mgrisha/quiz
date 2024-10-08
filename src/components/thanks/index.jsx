import { useContext, useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { CSVLink } from "react-csv";
import { BsDownload } from "react-icons/bs";

import styles from './Thanks.module.scss';
import thanksChecked from '../../assets/images/thanksChecked.png';

import { StoreContext } from "../../context/StoreContext";

const Thanks = () => {
  const [csvData, setCsvData] = useState([]);
  const { handleClickRetakeQuiz, answers } = useContext(StoreContext);
  const { t } = useTranslation();

  const headers = [
    { label: "order", key: "order" },
    { label: "title", key: "title" },
    { label: "type", key: "type" },
    { label: "answer", key: "answer" }
  ];

  useEffect(() => {
    const data = answers.map(({ order, title, type, answer }) => {
      return {
        order,
        title: t(title),
        type,
        answer: answer.join(',')
      }
    });
    setCsvData(data);
  }, [answers]);

  return (
    <div className={styles.thanks}>
      <div className={styles['thanks-title']}>{t('thank_you')}</div>
      <div className={styles['thanks-subtitle']}>{t('for_supporting_us_and_passing_quiz')}</div>
      <div className={styles['thanks-image']}><img src={thanksChecked} alt="thanks checked" /></div>
      <CSVLink className={styles['thanks-download']} data={csvData} headers={headers} separator={";"} filename="test-user-data.csv">
        <BsDownload />
        <div className={styles['thanks-download__text']}>{t('download_my_answers')}</div>
      </CSVLink>
      <div className={styles['thanks-retake']} onClick={handleClickRetakeQuiz}>{t('retake_quiz')}</div>
    </div>
  )
}

export default Thanks;