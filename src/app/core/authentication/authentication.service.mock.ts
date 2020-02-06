import { Observable, of } from 'rxjs';

import { LoginContext } from './authentication.service';
import { Credentials } from './credentials.service';

export class MockAuthenticationService {
  credentials: Credentials | null = {
    username: 'test',
    id: 1 
  };

  login(context: LoginContext): Observable<Credentials> {
    return of({
      username: context.username,
      id: 1 
    });
  }

  logout(): Observable<boolean> {
    this.credentials = null;
    return of(true);
  }
}
