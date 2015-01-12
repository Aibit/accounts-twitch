# accounts-twitch

Meteor.js Accounts package for Twitch.tv accounts

## Installation

    meteor add jameslefrere:accounts-twitch

## Usage
- Configure your app to include the application you have registered on Twitch or create a new one. The easiest way to do this is using the `{{loginButtons}}` helper from the accounts-ui package (remember to `meteor add accounts-ui`).
- Once your app is configured you can let people login either using the `{{loginButtons}}` helper or by calling `Meteor.loginWithTwitch();` directly. Permissions that are asked for can be included e.g. `Meteor.loginWithTwitch({ requestPermissions: ['channel_editor'] });`.
- A user's access token is available server side via `Meteor.user().services.twitch.accessToken`.

``` javascript
var query = Accounts.twitch.apiCall("GET", "https://api.twitch.tv/kraken/user", Meteor.user().services.twitch.accessToken);
return query.data.email;
```
