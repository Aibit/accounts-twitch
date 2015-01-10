Future = Npm.require("fibers/future")
Accounts.oauth.registerService "twitch"
Accounts.addAutopublishFields
  forLoggedInUser: ["services.twitch"]
  forOtherUsers: ["services.twitch.username"]


OAuth.registerService "twitch", 2, null, (query) ->

  config = Accounts.loginServiceConfiguration.findOne(service: "twitch")
  throw new Accounts.ConfigError("Twitch Service not configured")  unless config
  defaultHeaders = headers:
    Accept: "application/vnd.twitchtv.v2+json"
    "Client-ID": config.clientId

  options = data:
    client_id: config.clientId
    redirect_uri: Meteor.absoluteUrl("_oauth/twitch?close")
    client_secret: config.secret
    grant_type: "authorization_code"
    code: query.code
    state: query.state
    console.log(query)

  _.extend options, defaultHeaders

  accessTokenFut = new Future()
  Meteor.http.call "POST", "https://api.twitch.tv/kraken/oauth2/token", options, (err, res) ->
    if !err
      accessTokenFut.return res.data.access_token
    else accessTokenFut.throw err
  
  accessToken = accessTokenFut.wait()
  _.extend defaultHeaders.headers,
    Authorization: "OAuth " + accessToken

  _.extend options, defaultHeaders
  identityFut = new Future()

  Meteor.http.call "GET", "https://api.twitch.tv/kraken", options, (err, res) ->
    if !err
      identityFut.return res.data.token
    else identityFut.throw err;

  identity = identityFut.wait()
  username = identity.user_name
  userIdFut = new Future()

  Meteor.http.call "GET", "https://api.twitch.tv/kraken/users/" + username, options, (err, res) ->
    if !err
      userIdFut.return res.data._id
    else userIdFut.throw err

  var userId = userIdFut.wait();

  #meteor requires a id associated with the service
  scope = identity.authorization.scopes
  console.log scope
  theUser =
    serviceData:
      accessToken: accessToken
      username: username
      id: userId

    options:
      profile:
        name: username
        scope: scope

  console.log theUser
  return theUser
