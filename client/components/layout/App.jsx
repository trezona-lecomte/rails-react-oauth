var React        = require('react');
var Reqwest      = require('reqwest');
var Menu         = require('./Menu.jsx');
var Router       = require('react-router');
var BlabsView    = require('../blabs/View.jsx');
var RouteHandler = Router.RouteHandler;
var Uri          = require('jsuri');

module.exports = React.createClass({
    getDefaultProps: function() {
        return {origin: process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:3000' : ''};
    },
    getInitialState: function() {
        return {showMenu: false, signedIn: false, currentUser: {handle: ''}};
    },
    componentWillMount: function() {
        var jwt = new Uri(location.search).getQueryParamValue('jwt');
        if (!!jwt) {sessionStorage.setItem('jwt', jwt);}
    },
    componentDidMount: function() {
        if (!!sessionStorage.getItem('jwt')) {this.currentUserFromAPI();}
    },
    currentUserFromAPI: function() {
        this.readFromAPI(this.props.origin + '/current_user', function(user) {
           this.setState({signedIn: true, currentUser: user});
        }.bind(this));
    },
    readFromAPI: function(url, successFunction) {
        Reqwest({
            url: url,
            type: 'json',
            method: 'get',
            headers: {'Authorization': sessionStorage.getItem('jwt')},
            contentType: 'application/json',
            success: successFunction,
            error: function(error) {
                console.error(url, error['response']);
                location = '/';
            }
        });
    },
    writeToAPI: function(method, url, data, successFunction) {
        Reqwest({
            url: url,
            data: data,
            type: 'json',
            method: method,
            contentType: 'application/json',
            headers: {'Authorization': sessionStorage.getItem('jwt')},
            success: successFunction,
            error: function(error) {
                console.error(url, error['response']);
                location = '/';
            }
        });
    },
    handleMenuClick: function() {
        this.setState({showMenu: !this.state.showMenu});
    },
    render: function () {
        var menu = this.state.showMenu ? 'show-menu' : 'hide-menu';

        return (
            <div id="app" className={menu}>
            <Menu origin={this.props.origin} sendMenuClick={this.handleMenuClick} signedIn={this.state.signedIn} />
              <div id="content">
                <RouteHandler origin={this.props.origin} readFromAPI={this.readFromAPI} writeToAPI={this.writeToAPI} currentUser={this.currentUser} signedIn={this.state.signedIn}/>
              </div>
            </div>
        );
    }
});