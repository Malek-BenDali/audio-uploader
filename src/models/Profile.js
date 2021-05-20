class Profile {
  constructor(
    uid,
    email,
    photoURL,
    name,
    createdAt,
    lastLogin,
    followers,
    following,
    description,
    interestedIn,
    conversation,
  ) {
    this.uid = uid;
    this.email = email;
    this.name = name;
    this.photoURL = photoURL;
    this.createdAt = createdAt;
    this.lastLogin = lastLogin;
    this.followers = followers;
    this.following = following;
    this.description = description;
    this.interestedIn = interestedIn;
    this.conversation = conversation;
  }
}
export default Profile;
