const FirstQuiz = () => {
  return (
    <div className='quiz'>
      <Header order='1' />
      <div className="quiz-body">
        <div className="quiz-title">What is your preferred language?</div>
        <div className="quiz-subtitle">Choose language</div>
        <div className={`quiz-selects__${typeSelect}`}>
          {
            selects.map(({ caption, id }) => (
              <SelectType caption={caption} key={id} typeSelect='single-select' />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default FirstQuiz