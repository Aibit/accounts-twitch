Package.describe({
  name: "jameslefrere:accounts-twitch",
  summary: "Login service for Twitch.tv accounts",
  version: "0.2.0",
  git: "https://github.com/JamesLefrere/accounts-twitch.git"
});

Package.onUse(function(api) {
  api.use([
    "coffeescript",
    "accounts-base",
    "accounts-oauth",
    ], ["client", "server"]);
  api.use("jameslefrere:twitch@0.1.0", ["client", "server"]);
  api.addFiles("twitch_login_button.css", "client");
  api.addFiles("twitch.coffee");
});
