export default class UserInfo {
  constructor(username, job) {
    this._username = document.querySelector(username);
    this._job = document.querySelector(job);
  }

  getUserInfo() {
    const userInfo = {
      username: this._username.textContent,
      job: this._job.textContent,
    }

    return userInfo;
  }

  setUserInfo(data) {
    this._username.textContent = data.name;
    this._job.textContent = data._job;
  }
}
