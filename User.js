let userId = 0

class User {
  constructor(userInfo) {
    this.name = userInfo.name
    this.ws = userInfo.ws
    this.userId = userId++
  }
}

module.exports = User
