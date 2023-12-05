import { TestBed } from '@angular/core/testing';

import { DespliegueProduccionInterceptor } from './despliegue-produccion.interceptor';

describe('DespliegueProduccionInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      DespliegueProduccionInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: DespliegueProduccionInterceptor = TestBed.inject(DespliegueProduccionInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
