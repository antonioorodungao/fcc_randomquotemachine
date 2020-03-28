import React, { Component } from "react";
class Quote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: "",
      isLoaded: false,
      quoteauthor: "",
      color: "#000000"
    };
  }

  componentDidMount() {
    //https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?
    this.fetchNewQuote();
  }

  render() {
    return this.state.isLoaded ? (
      <div
        style={{
          background: `${this.state.color}`,
          height: "100vh",
          width: "100%"
        }}
      >
        <div id="quote-box" className="container">
          <div className="row">
            <div className="col-md-9 col-sm-12 col-lg-6 my-5 mx-auto py-5">
              <div className="card">
                <div
                  className="card-body align-self-center bg-light"
                  style={{
                    color: `${this.state.color}`
                  }}
                >
                  <h1 id="text">{this.state.quote}</h1>
                  <blockquote
                    id="author"
                    className="card-block card-blockquote"
                  >
                    - {this.state.quoteauthor}
                  </blockquote>
                </div>
                <div className="card-footer">
                  <a id="tweet-quote" href="twitter.com/intent/tweet">
                    <i
                      className="fab fa-twitter-square mr-3 fa-2x"
                      style={{
                        color: `${this.state.color}`
                      }}
                    ></i>
                  </a>
                  <a href="#">
                    <i
                      className="fab fa-facebook-square mr-3 fa-2x"
                      style={{
                        color: `${this.state.color}`
                      }}
                    ></i>
                  </a>
                  <a href="#">
                    <i
                      className="fab fa-instagram-square fa-2x"
                      style={{
                        color: `${this.state.color}`
                      }}
                    ></i>
                  </a>
                  <button
                    id="new-quote"
                    className="btn btn-primary float-right "
                    style={{
                      border: `${this.state.color}`,
                      background: `${this.state.color}`
                    }}
                    onClick={this.fetchNewQuote}
                  >
                    Next Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      ""
    );
  }

  fetchNewQuote = async () => {
    this.setState({
      isLoaded: false
    });
    try {
      let result = await fetch(
        "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json"
      );
      let json = await result.json();
      console.log(json);
      this.setState({
        quote: json.quoteText,
        isLoaded: true,
        quoteauthor: json.quoteAuthor
      });

      this.randomColor();
    } catch (e) {
      console.log(e);
    }
  };

  randomColor = () => {
    this.setState({
      color: "#" + Math.floor(Math.random() * 16777215).toString(16)
    });
  };
}

export default Quote;
