var util = require('util')
var OAuth2Strategy = require('passport-oauth2')

function Strategy (options, verify) {
  options = options || {}
  options.authorizationURL = options.authorizationURL || 'https://open.weixin.qq.com/connect/oauth2/authorize'
  options.scopeSeparator = options.scopeSeparator || ','
  options.customHeaders = options.customHeaders || {}
  options.tokenURL = 'empty'
  options.profileURL = options.profileURL || 'https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo'
  if (!options.customHeaders['User-Agent']) {
    options.customHeaders['User-Agent'] = options.userAgent || 'passport-weixin-enterprise'
  }

  OAuth2Strategy.call(this, options, verify)
  this.name = 'weixin-enterprise'
  this._oauth2.getOAuthAccessToken = function (code, params, callback) {
    callback(null, code)
  }
}

util.inherits(Strategy, OAuth2Strategy)

Strategy.prototype.userProfile = function (authCode, done) {
  done(null, {code: authCode})
}

module.exports = Strategy

