import {from, throwError} from 'rxjs';
import {mergeMap, tap} from 'rxjs/operators';
import {IRequestOptions, IRequestService} from "@gm/isomorphic-core";

export class FetchRequestService implements IRequestService {

  public request<T>(method,
                    url,
                    body = null,
                    options: IRequestOptions = {}) {
    if (options.params) {
      url += '?' + Object.keys(options.params)
        .map(key => `${key}=${options.params[key]}`)
        .join('&');
    }
    return from(fetch(url, {
      method: method,
      body: body && JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      }
    })).pipe(
      mergeMap(t => {
        if (t.status >= 300){

          return throwError({
            code: t.status,
            message: t.text()
          })
        }
        if (/json/.test(t.headers.get('Content-Type')))
          return t.json();
        return t.text();
      }),
    );
  }

}
