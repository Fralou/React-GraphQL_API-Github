import React, {Component} from 'react';

export default class Search extends Component {

    onSubmitForm(e) {
        e.preventDefault();
        const searchText = this.refs.searchText.value;
        this.props.onFormChange(searchText);
    }

render() {
        return(
            <div>
                <form onSubmit={e => this.onSubmitForm(e)} >
                    <div>
                        <input type="search" ref="searchText" placeholder="Search..." />
                        <button onClick={this.props.clr}>Search</button>
                    </div>
                </form>
            </div>
        );
    }
}