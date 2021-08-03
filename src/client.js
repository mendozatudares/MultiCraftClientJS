// Obtain the root
const rootElement = document.getElementById('root')

class SearchApp extends React.Component {
  constructor() {
    super();
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleLangChange = this.handleLangChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.state = {
      search: [],
      filter_en: false,
      filter_date: "",
    };
  }

  handleSearchChange(e) {
    const new_search = e.target.value.replace(/[.,\/#!\?$%\^&\*;:{}=\-_`~()]/g, "").trim().split(/\s+/);
    if (JSON.stringify(new_search) !== JSON.stringify(this.state.search))
      this.setState({
        search: new_search,
      });
  }

  handleLangChange(value) {
    this.setState({
      filter_en: value,
    });
  }

  handleDateChange(e) {
    this.setState({
      filter_date: e.target.value,
    })
  }

  render() {
    return (
      <div>
        <Header onSearch={this.handleSearchChange} onLang={this.handleLangChange} onDate={this.handleDateChange}/>
        <Body state={this.state}/>
      </div>
    );
  }
}

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  handleCheckboxChange(e) {
    let node = this.refs.filter_en;
    this.props.onLang(node.checked);
  }

  render() {
    return (
      <nav className="navbar sticky-top navbar-light bg-white">
        <div className="container">
          <div className="input-group input-group-lg">
            <div className="input-group-prepend">
              <span className="input-group-text" id="search">SSA News</span>
            </div>
            <input type="text" className="form-control" placeholder="Search for articles by text" aria-label="Search" aria-describedby="search" onChange={this.props.onSearch}/>
          </div>
          <div className="form-inline mt-1">
            <div className="input-group-prepend">
              <span className="input-group-text" id="date">Date</span>
            </div>
            <input type="date" className="form-control mr-sm-2" aria-label="Date" onChange={this.props.onDate}/>
            <input type="checkbox" className="form-check-input" id="english" ref="filter_en" onClick={this.handleCheckboxChange}/>
            <label className="form-check-label">English results only</label>
          </div>
        </div>
      </nav>
    );
  }
}

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      listed_results: 0,
      total_results: 0,
    }
    this.globalRenderArticlesNonce;
  }

  componentDidUpdate(prevProps) {
    if (prevProps === this.props) return;

    this.renderArticles()
      .then(data => {
        if (data !== null) {
          const empty = data.length == 0;
          this.setState({
            articles: empty ? [] : data[0],
            listed_results: empty ? 0 : data[1],
            total_results: empty ? 0 : data[2],
          });
        }
      });
  }

  componentDidMount() {
    // https://medium.com/javascript-in-plain-english/building-an-infinite-scroll-with-vanilla-javascript-32810bae9a8c
    window.addEventListener("scroll", () => {
      const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight > scrollHeight - 5) {
        this.renderArticles(this.state.listed_results)
          .then(data => {
            if (data !== null)
              this.setState({
                articles: this.state.articles.concat(data[0]),
                listed_results: this.state.listed_results + data[1],
              });
          });
      }
    });
  }

  render() {
    return (
      <div className="container">
        {this.state.articles}
      </div>
    );
  }

  async renderArticles(offset = 0) {
    // https://dev.to/chromiumdev/cancellable-async-functions-in-javascript-5gp7
    const localNonce = this.globalRenderArticlesNonce = new Object();

    if (this.props.state.search.length == 0) { return []; }

    const generateURL = () => {
      let url = "http://ssa-hw2-backend.stevetarzia.com/api/search";
      url += "?query=" + this.props.state.search.join(" ");
      if (this.props.state.filter_en) url += "&language=en";
      if (this.props.state.filter_date) url += "&date=" + this.props.state.filter_date;
      if (offset) url += "&offset=" + offset;

      return encodeURI(url);
    };

    const generateArticleList = (items) => {
      return items.map((article, i) => {
        return (
          <Card key={i + offset} article={article} search={this.props.state.search}/>
        );
      });
    };

    const results = await
        fetch(generateURL())
          .then(response => response.json()) /* asynchronously parse the response as JSON */
          .then(function(json) { /* do something with the resulting "json" object */
            return [generateArticleList(json.articles), json.returned_results, json.total_results];
          })
          .catch(function(error) { /* do something if either the HTTP call or the JSON parsing fails */
            console.error(error);
            return [];
          });

    // check if a new call to this function was made during execution (will likely happen when typing)
    if (localNonce !== this.globalRenderArticlesNonce) { return null; }
    return results;
  }
}

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const trim = (txt) => {
      let txtLower = txt.toLowerCase();
      let start = -1, index = 0;
      while (start == -1 && index < this.props.search.length) {
        start = txtLower.indexOf(`${this.props.search[index].toLowerCase()} `);
        index++;
      }
      start = start > 50 ? start - 50 : 0;
      let snippet = txt.substring(start, txt.length);
      if (start > 0) snippet = "..." + snippet;
      return snippet.length > 270 ? snippet.substring(0, 270) + "..." : snippet;
    };

    // https://itnext.io/dynamic-keyword-highlighting-in-javascript-434437f9afca
    const highlight = (txt) => {
      let temp = txt;
      this.props.search.forEach(keyword => temp = temp.replace(new RegExp(`(\\s?)(${keyword})([^a-zA-Z0-9])`, 'ig'), '$1<keyword>$2<keyword>$3'));
      const tempSplit = temp.split('<keyword>');
      return tempSplit.map((chunk, i) => chunk.indexOf(" ") == -1 ? <b key={i}>{chunk}</b> : <span key={i}>{chunk}</span>);
    };

    return (
      <div className="card m-3">
        <div className="card-body">
          <a href={this.props.article.url}>
            <h5 className="card-title">{this.props.article.title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{this.props.article.url}</h6>
          </a>
          <p className="card-text">
            {highlight(trim(this.props.article.txt))}
          </p>
        </div>
      </div>
    );
  }
}

// Use the ReactDOM.render to show your component on the browser
ReactDOM.render(
  <SearchApp />,
  rootElement
)