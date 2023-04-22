import { TestBed } from '@angular/core/testing';

import { ProdutosmateriaprimaService } from './produtosmateriaprima.service';

describe('ProdutosmateriaprimaService', () => {
  let service: ProdutosmateriaprimaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdutosmateriaprimaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
