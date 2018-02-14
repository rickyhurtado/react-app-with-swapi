import React, { Component } from 'react';
import Axios from 'axios';
import { PageTitle, Navigations } from '../Lib/Common/Views';

export default class DataListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.recordId,
      record: null,
      list: [],
      dataList: [],
      currentPage: 0,
      prevDisabled: true,
      nextDisabled: true,
      error: false
    };

    this.prevList = this.prevList.bind(this);
    this.nextList = this.nextList.bind(this);
  }

  componentDidMount() {
    Axios
      .get(`https://swapi.co/api/${this.props.title.toLowerCase()}/${this.state.id}`)
      .then(response => {
        this.setState({ record: response.data });

        return Promise
          .all(getList(response.data[this.props.attribute.toLowerCase()]))
          .then(promises => {
            let dataList = sliceArrayData(promises);
            let nextDisabled = dataList.length === 1;

            this.setState({ list: dataList[0], dataList, nextDisabled, error: false });
          })
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

  getListItems(currentPage) {
    const prevDisabled = currentPage === 0;
    const nextDisabled = currentPage === this.state.dataList.length - 1;
    const list = this.state.dataList[currentPage];

    this.setState({ list, currentPage, prevDisabled, nextDisabled });
  }

  prevList() {
    this.getListItems(this.state.currentPage - 1);
  }

  nextList() {
    this.getListItems(this.state.currentPage + 1);
  }

  render() {
    const title = this.props.title;
    const attribute = this.props.attribute;
    const record = this.state.record;
    const list = this.state.list;
    const resources = title.toLowerCase();

    if (this.state.error) {
      return (
        <div>
          <PageTitle title={`No ${title} Found`} />
          <Navigations resources={resources} title={title} />
        </div>
      );
    }

    return (
      <div className="data-list-item">
        {record ? (
            <div>
              <PageTitle title={record.title} parent={title} />
              {list.length > 0 ?
                (
                  <div>
                    <h2 className="page-sub-title">{attribute}</h2>
                    <ul className="star-wars-list">
                      {list.map(item =>
                        <li key={item.url} className="star-wars-list-item-small">{item.name || item.title}</li>
                      )}
                    </ul>
                    <p className="data-list-item-counter">{this.state.currentPage + 1} of {this.state.dataList.length}</p>
                    <nav className="data-list-item-pagination">
                      <button className="nav-button" onClick={this.prevList} disabled={this.state.prevDisabled}>Prev</button>
                      <button className="nav-button" onClick={this.nextList} disabled={this.state.nextDisabled}>Next</button>
                    </nav>
                  </div>
                ) : (
                  <p>{`Loading Star Wars ${attribute}...`}</p>
                )
              }
              <Navigations resources={resources} title={title} />
            </div>
          ) : (
            <div>
              <PageTitle title={title} />
              <p>{`Loading...`}</p>
            </div>
          )
        }
      </div>
    );
  }
};

function getList(list) {
  return list.map(url => getListData(url));
}

function getListData(url) {
  return Axios
    .get(url)
    .then(response => {
      return response.data;
    });
}

function sliceArrayData(data, chunk=10) {
  let i, j, tempArray = [];

  for (i=0, j=data.length; i<j; i+=chunk) {
    tempArray.push(data.slice(i, i+chunk));
  }

  return tempArray;
}
