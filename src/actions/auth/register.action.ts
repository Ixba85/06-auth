import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  type AuthError,
} from 'firebase/auth';
import { firebase } from '../../firebase/config';

export const registerUser = defineAction({
  accept: 'form',
  input: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    remember_me: z.boolean().optional(),
  }),
  handler: async ({ name, email, password, remember_me }, { cookies }) => {
    // Handle cookies
    if (remember_me) {
      cookies.set('email', email, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), // 1 year
        path: '/',
      });
    } else {
      cookies.delete('email', {
        path: '/',
      });
    }

    try {
      // Create the user
      const userCredential = await createUserWithEmailAndPassword(
        firebase.auth,
        email,
        password
      );
      const firebaseUser = userCredential.user;

      // Update the display name
      await updateProfile(firebaseUser, {
        displayName: name,
      });

      // Send email verification
      await sendEmailVerification(firebaseUser, {
        url: `${import.meta.env.WEBSITE_URL}/protected?emailVerified=true`,
      });

      // Return a plain object with only the necessary data
      return {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
      };
    } catch (error) {
      const firebaseError = error as AuthError;

      if (firebaseError.code === 'auth/email-already-in-use') {
        throw new Error('El correo ya está en uso');
      }

      throw new Error('Auxilio! algo salió mal');
    }
  },
});
