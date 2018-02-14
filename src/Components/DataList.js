import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { PageTitle, Navigations } from '../Lib/Common/Views';
import { getUrlID, getUrlPage } from '../Lib/Helpers/SwapiApi';

export default class DataList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      key: new Date(),
      data: [],
      currentPage: props.currentPage,
      nextPage: null,
      prevPage: null,
      axiosCancelToken: null,
      error: false
    };

    this.gotoNextPage = this.gotoNextPage.bind(this);
    this.gotoPrevPage = this.gotoPrevPage.bind(this);
  }

  getData(currentPage) {
    const CancelToken = Axios.CancelToken;
    const getPage = currentPage ? `/?page=${currentPage}` : '';
    const _this = this;

    Axios
      .get(`https://swapi.co/api/${this.props.title.toLowerCase()}${getPage}`, {
        cancelToken: new CancelToken(function executor(cancel) {
          _this.setState({ axiosCancelToken: cancel })
        })
      })
      .then(response => {
        const nextPage = getUrlPage(response.data.next);
        const prevPage = getUrlPage(response.data.previous);

        this.setState({ data: response.data.results, nextPage, prevPage, error: false });
      })
      .catch(error => {
        if (process.env.NODE_ENV !== 'test') {
          if (Axios.isCancel(error)) {
            return true;
          }

          this.setState({ error: true });
        }
      });
  }

  gotoNextPage() {
    this.setState({ currentPage: this.state.nextPage, error: false });
  }

  gotoPrevPage(page) {
    this.setState({ currentPage: this.state.prevPage, error: false });
  }

  componentWillReceiveProps(props) {
    this.state.axiosCancelToken();
    this.setState({ key: new Date(), data: [], error: false });
    this.getData(props.currentPage);
  }

  componentDidMount() {
    this.getData(this.state.currentPage);
  }

  render() {
    const title = this.props.title;
    const displayLink = this.props.displayLink != null ? this.props.displayLink : true;
    const resources = this.props.title.toLowerCase();
    const data = this.state.data;
    const nextPage = this.state.nextPage;
    const prevPage = this.state.prevPage;

    if (this.state.error) {
      return (
        <div>
          <PageTitle title={`No ${title} Found`} />
          <Navigations resources={resources} title={title} />
        </div>
      );
    }

    return (
      <div>
        <PageTitle title={title} />
        {data.length > 0 ? (
            <div>
              <ul className="star-wars-list">
                {data.map(record =>
                  <ListItem key={record.url} resources={resources} record={record} displayLink={displayLink} />
                )}
              </ul>
              <nav className="pagination">
                <PrevButton resources={resources} page={prevPage} onClick={this.gotoPrevPage} />
                <NextButton resources={resources} page={nextPage} onClick={this.gotoNextPage} />
              </nav>
              <nav>
                <Link to="/" className="nav-button single">Home</Link>
              </nav>
            </div>
          ) : (
            <p>{`Loading Star Wars ${title}...`}</p>
          )
        }
      </div>
    );
  }
};

const ListItem = ({...props}) => {
  const title = props.record.name || props.record.title;

  return (
    <li className="star-wars-list-item">
      {props.displayLink ? <Link to={`/${props.resources}/${getUrlID(props.record.url)}`}>{title}</Link> : title }
    </li>
  );
}

const PrevButton = ({...props}) => {
  return <PaginationButton {...props} title="Prev" />;
}

const NextButton = ({...props}) => {
  return <PaginationButton {...props} title="Next" />;
}

const PaginationButton = ({...props}) => {
  if (props.page) {
    return <Link {...props} to={`/${props.resources}/page/${props.page}`} className="nav-button">{props.title}</Link>;
  }

  return <span className="nav-button">{props.title}</span>;
}
