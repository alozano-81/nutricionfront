import { TestBed } from '@angular/core/testing';

import { EncabezadosAuthorizationInterceptor } from './encabezados-authorization.interceptor';

describe('EncabezadosAuthorizationInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      EncabezadosAuthorizationInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: EncabezadosAuthorizationInterceptor = TestBed.inject(EncabezadosAuthorizationInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
