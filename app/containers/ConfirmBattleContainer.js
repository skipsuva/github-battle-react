var React = require('react');
var ConfirmBattle = require('../components/ConfirmBattle');
var gitHubHelpers = require('../utils/gitHubHelpers');


var ConfirmBattleContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return {
      isLoading: true,
      playersInfo: []
    };
  },

  componentDidMount: function () {
    var query = this.props.location.query;
    // fetch info from github, then update state
    gitHubHelpers.getPlayersInfo([query.playerOne, query.playerTwo])
      .then(function (players) {
        this.setState({
          isLoading: false,
          playersInfo: [players[0], players[1]]
        })
      }.bind(this))
  },

  render: function () {
    return(
      <ConfirmBattle
        isLoading={this.state.isLoading}
        playersInfo={this.state.playersInfo}/>
    );
  }
});

module.exports = ConfirmBattleContainer;
