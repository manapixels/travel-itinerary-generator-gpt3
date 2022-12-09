import { useState, memo } from 'react';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';

const areasOfInterest = ["strengths and weaknesses", "romantic relationships", "friendships", "parenthood", "career paths", "workplace habits", "ideal tinder profile", "ideal job profile"]


const Home = () => {

  const [userInput, setUserInput] = useState('');
  const [area, setArea] = useState('');

  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };

  console.log(area)

  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Understand your personality type</h1>
          </div>
          <div className="header-subtitle">
            <h2>I shall explain it to you in your area of interest</h2>
          </div>
        </div>
        <div className="prompt-container">
          <input
            type="text"
            placeholder="Key in one of your mbti / enneagram types (e.g. ESTJ or Enneagram Type 5)"
            className="prompt-box"
            value={userInput}
            onChange={onUserChangedText}
          />
          <div className="areas-of-interests">
            {areasOfInterest.map((i) => (
              <button className={`item ${area.includes(i) && 'selected'}`} key={i} onClick={() => setArea(i)}>{i}</button>
            ))}
          </div>
          <div className="prompt-buttons">
            <a className="generate-button" onClick={null}>
              <div className="generate">
                <p>Generate</p>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
