var React = require('react');
var BlabsView = require('../blabs/View.jsx');

module.exports = React.createClass({
    render: function() {
        return (
            <div id="content">
              <BlabsView/>
            </div>
        );
    }
});
