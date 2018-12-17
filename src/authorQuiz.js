import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './App.css';
import './bootstrap.min.css';
import PropTypes from 'prop-types'

function Hero() {
  return (
    <div className="row">
      <div className="jumbotron col-10 offset-1">
        <h1>Author Quiz</h1>
        <p>Select the book written by the author shown</p>
      </div>
    </div>
  );
}

function Book({title, onAnswerSelected}) {
  return (
    <div className="answer" onClick={() => {onAnswerSelected(title)}}>
      <h4>{title}</h4>
    </div>
  );
}

function  highlightToBgColor(highlight) {
  const mapping = {
    'none': '',
    'correct': 'green',
    'wrong': 'red'
  };
  return mapping[highlight];
}

function Turn({author, books, highlight, onAnswerSelected}) {
  return (
    <div className="row turn"
         style={{backgroundColor: highlightToBgColor(highlight)}}>

      <div className="col-4 offset-1">
        <img src={author.imageUrl}
             alt="Author"
             className="authorImage"/>
      </div>

      <div className="col-6">
        {books.map(title => <Book title={title}
                                  key={title}
                                  onAnswerSelected={onAnswerSelected} />)}
      </div>
    </div>
  );
}

Turn.propTypes = {
  author: PropTypes.shape({
    name:PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    imageSource: PropTypes.string.isRequired,
    books: PropTypes.arrayOf(PropTypes.string).isRequired
  }),

  books: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
  highlight: PropTypes.string.isRequired
};

function Continue({ show, onContinue }) {
  return (
    <div className="row continue">
      { show ?
        <div className="col-11">
          <button className="btn btn-primary btn-lg float-right"
                  onClick={onContinue}>
            Continue
          </button>
        </div>
        : null
      }
    </div>
  );
}

function Footer() {
  return (
    <div id="footer" className="row">
      <div className="text-muted credit">
        All images are from&nbsp;
        <a href="https://www.mediawiki.org/wiki/MediaWiki">
          Wikemedia Commons
        </a>
        &nbsp;and are in the public domain.
      </div>

    </div>
  );
}

function AuthorQuiz({turnData, highlight, onAnswerSelected,onContinue}) {
  return (
    <div className="container-fluid">
      <Hero />
      <Turn {...turnData}
            highlight={highlight}
            onAnswerSelected={onAnswerSelected}/>
      <Continue show={highlight === 'correct'}
                onContinue={onContinue}/>
      <p><Link to="/Add">Add an Author</Link></p>
      <Footer />
    </div>
  );
}

export default AuthorQuiz;
