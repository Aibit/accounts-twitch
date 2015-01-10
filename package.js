Package.describe({
  name: "jameslefrere:accounts-twitch",
  summary: "Login service for Twitch.tv Accounts",
  version: "0.1.0",
  git: "https://github.com/JamesLefrere/accounts-twitch.git"
});

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.0");
  api.use([
    "templating",
    "underscore",
    "random"
    ], "client");
  api.use([
    "coffeescript",
    "accounts-base",
    "accounts-oauth",
    "http",
    "service-configuration",
    "oauth2"
    ], ["client", "server"]);
  api.addFiles([
    "twitch_configure.html",
    "twitch_configure.coffee"
    ], "client");
  api.addFiles("twitch_server.coffee", "server");
  api.addFiles("twitch_client.coffee", "client");
});
