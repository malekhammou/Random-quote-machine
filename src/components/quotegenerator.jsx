import React, { Component } from 'react';
import axios from 'axios';
class QuoteGenerator extends Component {
  state = {
    quote: '',
    author: '',
    Colors: ['LightYellow', 'LightCyan	', 'SandyBrown	']
  };

  async componentDidMount() {
    this.populateQuoteMachine();
  }
  randomColor = () => {
    return this.state.Colors[
      Math.floor(Math.random() * this.state.Colors.length)
    ];
  };
  populateQuoteMachine = async () => {
    this.randomColor();
    const originalQutoes = { ...this.state.quote };
    try {
      const { data } = await axios.get(
        'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
      );
      const randomQuote =
        data.quotes[Math.floor(Math.random() * data.quotes.length)];
      this.setState({ quote: randomQuote.quote, author: randomQuote.author });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log('Error occured');
        this.setState({ originalQutoes });
      }
    }
  };
  render() {
    return (
      <div className="container">
        <div id="quote-box" style={{ background: this.randomColor() }}>
          <div id="text">
            <i className="fa fa-quote-left">&nbsp; &nbsp; </i>
            {this.state.quote}
          </div>
          <p id="author">-{this.state.author}</p>
          <div className="clickables">
            <a
              id="tweet-quote"
              href={`https://twitter.com/intent/tweet?text=${this.state.quote.replace(
                ';',
                '%3B'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa fa-twitter fa-2x"></i>
            </a>
            <button
              className="btn btn-primary"
              onClick={this.populateQuoteMachine}
            >
              New quote
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default QuoteGenerator;
