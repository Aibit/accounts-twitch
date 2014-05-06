Accounts.oauth.registerService('twitch');

var requestCredential = function (options, credentialRequestCompleteCallback) {
	// support both (options, callback) and (callback).
	if (!credentialRequestCompleteCallback && typeof options === 'function') {
		credentialRequestCompleteCallback = options;
		options = {};
	}

	var scope = (options && options.requestPermissions) || [];
	var flatScope = _.map(scope, encodeURIComponent).join('+');

	var config = ServiceConfiguration.configurations.findOne({service: 'twitch'});
	if (!config) {
		credentialRequestCompleteCallback && credentialRequestCompleteCallback(
			new ServiceConfiguration.ConfigError());
		return;
	}
	var credentialToken = Random.secret();

	var state = Meteor.uuid();

	var loginUrl =
		'https://api.twitch.tv/kraken/oauth2/authorize' +
		'?response_type=code' +
		'&client_id=' + config.clientId +
		'&redirect_uri=' + Meteor.absoluteUrl('_oauth/twitch?close') +
//		'&scope=' + flatScope +
		'&scope=' + 'user_read' +
		'&state=' + credentialToken;

	OAuth.showPopup(
		loginUrl,
		_.bind(credentialRequestCompleteCallback, null, credentialToken),
		{width: 800, height: 600}
	);
};

Meteor.loginWithTwitch = function(options, callback) {
	// support a callback without options
	if (! callback && typeof options === 'function') {
		callback = options;
		options = null;
	}

	var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
	requestCredential(options, credentialRequestCompleteCallback);
};

Template.configureLoginServiceDialogForTwitch.siteUrl = function () {
	return Meteor.absoluteUrl();
};

Template.configureLoginServiceDialogForTwitch.fields = function () {
	return [
		{property: 'clientId', label: 'Client ID'},
		{property: 'secret', label: 'Client Secret'}
	];
};