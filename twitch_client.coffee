Accounts.oauth.registerService "twitch"

requestCredential = (options, credentialRequestCompleteCallback) ->
  # support both (options, callback) and (callback).
  if not credentialRequestCompleteCallback and typeof options is "function"
    credentialRequestCompleteCallback = options
    options = {}
  scope = (options and options.requestPermissions) or []
  flatScope = _.map(scope, encodeURIComponent).join("+")
  config = ServiceConfiguration.configurations.findOne(service: "twitch")
  unless config
    credentialRequestCompleteCallback and credentialRequestCompleteCallback(new ServiceConfiguration.ConfigError())
    return
  credentialToken = Random.secret()
  state = Meteor.uuid()

  loginUrl = "https://api.twitch.tv/kraken/oauth2/authorize" + "?response_type=code" + "&client_id=" + config.clientId + "&redirect_uri=" + Meteor.absoluteUrl("_oauth/twitch?close") + "&scope=" + "user_read" + "&state=" + credentialToken
  OAuth.showPopup loginUrl, _.bind(credentialRequestCompleteCallback, null, credentialToken),
    width: 800
    height: 600

  return

Meteor.loginWithTwitch = (options, callback) ->
  # support a callback without options
  if not callback and typeof options is "function"
    callback = options
    options = null
  credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback)
  requestCredential options, credentialRequestCompleteCallback
  return

Template.configureLoginServiceDialogForTwitch.siteUrl = ->
  Meteor.absoluteUrl()

Template.configureLoginServiceDialogForTwitch.fields = ->
  [
    {
      property: "clientId"
      label: "Client ID"
    }
    {
      property: "secret"
      label: "Client Secret"
    }
  ]