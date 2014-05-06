Package.describe({
  summary: 'Login service for Twitch.tv Accounts'
});

Package.on_use(function(api) {
	api.use('accounts-base', ['client', 'server']);
	api.imply('accounts-base', ['client', 'server']);
	api.use('accounts-oauth', ['client', 'server']);

	api.use('oauth2', ['client', 'server']);
	api.use('oauth', ['client', 'server']);
  api.use('http', ['client', 'server']);
	api.use('underscore', 'client');
  api.use('templating', 'client');
	api.use('random', 'client');
	api.use('service-configuration', ['client', 'server']);

  api.add_files(
    ['twitch_configure.html', 'twitch_configure.js'],
    'client');

//  api.add_files('twitch_common.js', ['client', 'server']);
  api.add_files('twitch_server.js', 'server');
  api.add_files('twitch_client.js', 'client');
});
