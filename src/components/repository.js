// React
import React from 'react';
import Issue from "./issue";
import Comments from "./comments";
import Dropdown from "./dropdown";
import Search from "./search";

// GraphQL
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const GetRepositoryInfoQuery = gql`
query GetRepositoryIssues($login: String!) {
  repositoryOwner(login: $login) {
    repositories(first: 100) {
      edges {
        node {
          name
          issues(first: 2) {
            edges {
              node {
                title
                state
                bodyText
                comments(first: 2) {
                  edges {
                    node {
                      bodyText
                      createdAt
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

`;

const withInfo = graphql(GetRepositoryInfoQuery, {
  options: ({ login }) => {
    return {
      variables: {
        login: 'octocat'
      }
    }
  },
  props: ({ data }) => {
    // loading state
    if (data.loading) {
      return { loading: true };
    }

    // error state
    if (data.error) {
      console.error(data.error);
    }

    // OK state
    return { data };
  },
});

// Repository
class Repository extends React.Component {
  constructor(props) {
      super(props);

      // states
      this.state = {
          login: props.login,
          name: props.name,
          isVisible: false,
          data: [],
          comdata: [],
          searchText: ''
      };
  }
  componentWillReceiveProps(newProps) {
    // states
    this.setState({
      login: this.props.login,
      name: this.props.name,
    });
  }
inVisible = () => {
    this.setState({
        isVisible: !this.state.isVisible,
        data: [],
        comdata: []
    })
}
funct = (data) => {
    this.setState({data})
}
funct2 = (comdata) => {
    this.setState({comdata})
}
clrcomment = (comdata) => {
    this.setState({comdata:[]})
}
clrallcomment = (comdata, data) => {
      this.setState({
          data: [],
          comdata: []
      })
}
handleChange =(searchText) => {
      this.setState({
          searchText
      })
}
getdata = (data) => {
        return data.repositoryOwner.repositories.edges.filter(item => {
            const name = item.node.name.toLowerCase()
            return (this.state.searchText.length === 0 || name.indexOf(this.state.searchText) > -1)
        })
}
  render() {

    return (
      <div>
        <div className="row">
            <h2 className="githublogin col-md-2" onClick={() => this.inVisible()}>{this.state.login}</h2>
            <div className="col-md-6 search">
                <Search onFormChange={this.handleChange} clr={this.clrallcomment} data={this.state.data}/>
            </div>
        </div>
          <div className="row cols">
            <div className="col-md-2" style={this.state.isVisible ? {display:"inline"} : {display:"none"}}>
              {this.props.loading ? <div>Loading...</div> : <Dropdown data={this.getdata(this.props.data)} iss={this.funct} clr={this.clrcomment}/>}
            </div>
            <div className="col-md-5">
              <Issue data={this.state.data} comm={this.funct2}/>
            </div>
            <div className="col-md-5">
              <Comments data={this.state.comdata} />
            </div>
          </div>
      </div>
    )
  }
}

const RepositoryWithInfo = withInfo(Repository);
export default RepositoryWithInfo;
