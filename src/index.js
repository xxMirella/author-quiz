import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './authorQuiz';
import * as serviceWorker from './serviceWorker';
import { shuffle, sample } from 'underscore';

const authors = [
  {
    name: 'Mask Twain',
    imageUrl: '/images/authors/marktwain.jpg',
    imageSource: 'Wikimedia Commons',
    books: [
      'The Adventures of Huckleberry Finn',
      'Life on the Mississipi',
      'Roughing It'
    ]
  },
  {
    name: 'Charles Dickens',
    imageUrl: '/images/authors/charlesdickens.jpg',
    imageSource: 'Wikimedia Commons',
    books: [
      'David Copperfield',
      'The Pickwick Papers',
      'Great Expectations'
    ]
  },
  {
    name: 'Jk Rowling',
    imageUrl: '/images/authors/jkrowling.jpg',
    imageSource: 'Wikimedia Commons',
    books: [
      'Harry Potter'
    ]
  },
  {
    name: 'Joseph Conrad',
    imageUrl: '/images/authors/josephconrad.jpg',
    imageSource: 'Wikimedia Commons',
    books: [
      'The Nigger of the Narcissus',
      'Heart of Darkness',
      'Lord Jim'
    ]
  },
  {
    name: 'William Shakespeare',
    imageUrl: '/images/authors/williamshakespeare.jpg',
    imageSource: 'Wikimedia Commons',
    books: [
      'All\'s Well That Ends Well',
      'King Lear',
      'Hamlet'
    ]
  }
];

function getTurnData(authors) {
  const allBooks = authors.reduce(function (p,c,i) {
    return p.concat(c.books);
  }, []);

  const fourRandomBooks = shuffle(allBooks).slice(0, 4);
  const answer = sample(fourRandomBooks);

  return {
    books: fourRandomBooks,
    author: authors.find(author =>
      author.books.some(title =>
        title === answer)
    )
  }
}

const state = {
  turnData: getTurnData(authors),
  highlight: ''
};

function onAnswerSelected(answer) {
  const isCorrect = state.turnData.author.books.some(book => book === answer);
  state.highlight = isCorrect ? 'correct' : 'wrong';
  render();
}

function render() {
  ReactDOM.render(<AuthorQuiz {...state} onAnswerSelected={onAnswerSelected}/>, document.getElementById('root'));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
render();
serviceWorker.unregister();
