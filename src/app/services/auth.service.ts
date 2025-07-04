import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { firebaseConfig } from '../../environments/firebase.config';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private app = initializeApp(firebaseConfig);
  private auth = getAuth(this.app);
  private googleProvider = new GoogleAuthProvider();
  
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor() {
    // Listen for auth state changes
    onAuthStateChanged(this.auth, (user) => {
      this.currentUserSubject.next(user);
    });
  }

  async signInWithGoogle(): Promise<any> {
    try {
      const result = await signInWithPopup(this.auth, this.googleProvider);
      return result;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  }

  async signOut(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }

  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }

  isLoggedIn(): boolean {
    return !!this.auth.currentUser;
  }
}
