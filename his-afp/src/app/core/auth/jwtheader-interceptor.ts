import { HttpInterceptorFn } from '@angular/common/http';

export const jWTHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  const reqClone = req.clone({
    headers: req.headers.set(
      'Authorization',
      `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJtZWRpY28iLCJyb2xlIjoiRE9DIiwiaWF0IjoxNzc2MjQ2NjQzLCJleHAiOjE3NzYyNTAyNDN9.oRqdrn1T36vnQQ46RrGxRxixFkdZb-gKKXQkgpxbd0U`,
    ),
  });
  return next(reqClone);
};
