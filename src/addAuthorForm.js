import React from 'react';
import './addAuthorForm.css'

class AuthorForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      imageUrl: '',
      books: [],
      bookTemp: ''
    };
    this.onFieldChange = this.onFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddBook = this.handleAddBook.bind(this);
  }

  onFieldChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onAddAuthor(this.state);
  }

  handleAddBook() {
    this.setState({
      books: this.state.books.concat([this.state.bookTemp]),
      bookTemp: ''
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="addAuthorForm__input">
          <label htmlFor="name">Name</label>
          <input type="text"
                 name="name"
                 value={this.state.name}
                 onChange={this.onFieldChange}/>
        </div>

        <div className="addAuthorForm__input">
          <label htmlFor="imageUrl">Image</label>
          <input type="text"
                 name="imageUrl"
                 value={this.state.imageUrl}
                 onChange={this.onFieldChange}/>
        </div>

        <div className="addAuthorForm__input">
          <label htmlFor="bookTemp">Books</label>
          {this.state.books.map(book => <p key={book}>{book}</p>)}
          <input type="text"
                 name="bookTemp"
                 value={this.state.bookTemp} onChange={this.onFieldChange}/>
          <input type="button" value="+" onClick={this.handleAddBook}/>
        </div>

        <input type="submit" value="Add"/>
      </form>
    )
  }
}

function AddAuthorForm({match, onAddAuthor}) {
  return (
    <div className="addAuthorForm">
      <h1>Add Author</h1>
      <AuthorForm onAddAuthor={onAddAuthor}/>
    </div>
  )
}

export default AddAuthorForm;
