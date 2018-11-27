import {Observable, of} from "rx";

export class AuthService {
    constructor() {

    }

    public IsAuthenticated(): Observable<boolean>{
        return of(true);
    }
}