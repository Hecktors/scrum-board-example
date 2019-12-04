import React, { useState, useLayoutEffect, useRef } from 'react'
import styled from 'styled-components/macro'
import Bookmark from './Bookmark'
import useAnswerHeight from './useAnswerHeight'

export default function Card({
  question,
  answer,
  onBookmarkClick,
  isBookmarked,
}) {
  const [isHidden, setIsHidden] = useState(true)
  const buttonText = isHidden ? 'Show answer' : 'Hide answer'
  const answerEl = useRef()
  const maxHeight = useAnswerHeight(answerEl)

  return (
    <CardWrapper>
      <Bookmark active={isBookmarked} onClick={onBookmarkClick} />
      <p>{question}</p>
      <Answer maxHeight={maxHeight} ref={answerEl} active={!isHidden}>
        {answer}
      </Answer>
      <button onClick={toggleAnswer}>{buttonText}</button>
    </CardWrapper>
  )

  function toggleAnswer() {
    setIsHidden(!isHidden)
  }
}

const Answer = styled.p`
  transition: height 0.3s ease-in-out;
  height: ${props => (props.active ? props.maxHeight + 'px' : '0')};
  overflow-y: hidden;
  word-break: break-all;
`

const CardWrapper = styled.section`
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #ddd;
  background: #eee;
  box-shadow: 0 10px 10px #0002;
  position: relative;
`
