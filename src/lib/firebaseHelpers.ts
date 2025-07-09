import { User } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { firestore } from '../../raiduix/firebase'; // Adjusted path to our Firebase config

/**
 * Creates a user profile document in Firestore if it doesn't already exist.
 * @param user The Firebase User object.
 * @param additionalData Any additional data to merge into the user document.
 */
export const createUserProfileDocument = async (user: User, additionalData = {}) => {
  if (!user) return;

  const userRef = doc(firestore, `users/${user.uid}`);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    const { email, displayName, photoURL } = user;
    const createdAt = serverTimestamp(); // Use server timestamp for creation date

    try {
      await setDoc(userRef, {
        uid: user.uid,
        email,
        displayName: displayName || email?.split('@')[0] || 'User', // Fallback for display name
        photoURL: photoURL || `https://avatar.vercel.sh/${user.uid}.png`, // Fallback avatar
        createdAt,
        lastLoginAt: createdAt, // Set lastLoginAt to createdAt initially
        tier: 'free', // Default tier
        ...additionalData,
      });
      console.log(`User document created for ${user.uid}`);
    } catch (error) {
      console.error("Error creating user document:", error);
      // Optionally re-throw or handle as needed by the application
    }
  } else {
    // If document exists, optionally update last login time or other fields
    try {
      await setDoc(userRef, { lastLoginAt: serverTimestamp() }, { merge: true });
      console.log(`User document updated for ${user.uid} (last login)`);
    } catch (error) {
      console.error("Error updating user document (last login):", error);
    }
  }
  return userRef; // Return the document reference
};
