import { JwtPayload, jwtDecode } from 'jwt-decode';
// import type { UserData } from '../interfaces/UserData';

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    return jwtDecode<JwtPayload>(this.getToken());
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired

    try {
      const decoded = jwtDecode<JwtPayload>(token);

      if (decoded?.exp && decoded?.exp < Date.now() / 1000) {

      return true;

      } 
    // if (decoded.exp)

    } catch (error) {
      // If there is an error, the token is invalid
      return false;
    }
  }

  getToken(): string {
    // TODO: return the token
    const loggedUser = localStorage.getItem('token') || '';
    return loggedUser;
  }

  login(idToken: string) {
      // TODO: set the token to localStorage
      // TODO: redirect to the home page
    
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
      }
  
    logout() {
      // TODO: remove the token from localStorage
      // TODO: redirect to the login page
    
        localStorage.removeItem('id_token');
        window.location.assign('/');
      }
    }

export default new AuthService();
