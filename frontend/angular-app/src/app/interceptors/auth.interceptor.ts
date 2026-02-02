import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const storedUser = localStorage.getItem('user');
  
  if (storedUser) {
    const user = JSON.parse(storedUser);
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${user.token}`)
    });
    return next(authReq);
  }

  return next(req);
};
