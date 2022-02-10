import Firebase from './FireBase';
export const FireSignUp = async (email, password) => {
  try {
    return await Firebase.auth().createUserWithEmailAndPassword(
      email,
      password,
    );
  } catch (error) {
    return error;
  }
};
