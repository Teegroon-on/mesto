export default class UserInfo {
  constructor({ username, job, avatar }) {
    this._username = document.querySelector(username);
    this._job = document.querySelector(job);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    const userInfo = {
      username: this._username.textContent,
      job: this._job.textContent,
      avatar: this._avatar.src
    }

    return userInfo;
  }

  setUserInfo(data) {
    this._username.textContent = data.name;
    this._job.textContent = data.about;
    this._avatar.src = data.avatar;
  }
}
