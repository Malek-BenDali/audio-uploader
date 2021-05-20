class Profile {
  constructor(uid, email, photoURL, name, createdAt, lastLogin) {
    this.uid = uid;
    this.email = email;
    this.name = name;
    this.photoURL = photoURL;
    this.createdAt = createdAt;
    this.lastLogin = lastLogin;
  }
}
export default Profile;
