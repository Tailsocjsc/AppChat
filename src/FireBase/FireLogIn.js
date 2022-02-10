import Firebase from './FireBase';
export const FireLogIn = async (email, password) => {
  try {
    return await Firebase.auth().signInWithEmailAndPassword(
      email,
      password,
    );
  } catch (error) {
    return error;
  }
};
