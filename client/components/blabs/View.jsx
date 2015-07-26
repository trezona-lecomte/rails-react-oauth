var React = require('react');
var BlabsList = require('./List.jsx');
var BlabsForm = require('./Form.jsx');

module.exports = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        this.readBlabsFromAPI();
    },
    readBlabsFromAPI: function() {
        this.props.readFromAPI(this.props.origin + '/blabs', function(blabs) {
            this.setState({data: blabs});
        }.bind(this));
    },
    writeBlabToAPI: function(data) {
        this.props.writeToAPI('post', this.props.origin + '/blabs', data, function(blab) {
            var blabs = this.state.data;
            blabs.unshift(blab);
            this.setState({data: blabs});
        }.bind(this));
    },
    render: function() {
        return (
            <div className="blabs-view">
              <BlabsForm writeBlabToAPI={this.writeBlabToAPI} signedIn={this.props.signedIn} />
              <BlabsList data={this.state.data} />
            </div>
        );
    }
});

// A React component is literally just a function of it's state and
// it's props. State should contain dynamic values that impact the UI,
// and a component is responsible for managing it's own state. Props
// are usually received from upstream and may contain data,
// configuration, or functionality, and they are immutable as far as
// the component receiving them is concerned.

// In this case, we have added "data" to BlabView's state, and
// subsequently assigned the value of that state to a prop of
// BlabsList, so we have restricted the responsibilty for mutating that
// piece of state to BlabView, but BlabList will still receive any
// changes in that state as this.props.data. This pattern is described
// in the docs:

// A common pattern is to create several stateless components that
// just render data, and have a stateful component above them in the
// hierarchy that passes its state to its children via props. The
// stateful component encapsulates all of the interaction logic, while
// the stateless components take care of rendering data declaratively.