Package.describe({
  name: "aibit:accounts-twitch",
  summary: "Login service for Twitch.tv accounts",
  version: "0.2.7",
  git: "https://github.com/Aibit/accounts-twitch.git"
});

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.0");
  api.use([
    "coffeescript",
    "accounts-base",
    "accounts-oauth",
    ], ["client", "server"]);
  api.use("aibit:twitch", ["client", "server"]);
  api.addFiles("twitch_login_button.css", "client");
  api.addFiles("twitch.coffee");
});
