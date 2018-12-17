import React from 'react';
import ReactDOM from 'react-dom';
import AddAuthorForm from './addAuthorForm'
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
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
  const allBooks = authors.reduce(function (p,c) {
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

function resetState () {
  return {
    turnData: getTurnData(authors),
    highlight: ''
  }
}

let state = resetState();

function onAnswerSelected(answer) {
  const isCorrect = state.turnData.author.books.some(book => book === answer);
  state.highlight = isCorrect ? 'correct' : 'wrong';
  render();
}

function App() {
  return <AuthorQuiz {...state}
                     onAnswerSelected={onAnswerSelected}
                     onContinue={() => {
                       state = resetState();
                       render();
                     }} />;
}

const AuthorWrapper = withRouter(({ history }) =>
  <AddAuthorForm onAddAuthor={(author) => {
    authors.push(author);
    history.push('/');
  }} />
);

function render() {
  ReactDOM.render(
    <BrowserRouter>
      <React.Fragment>
        <Route exact path="/" component={App} />
        <Route exact path="/add" component={AuthorWrapper} />
      </React.Fragment>
    </BrowserRouter>, document.getElementById('root'));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
render();
serviceWorker.unregister();
