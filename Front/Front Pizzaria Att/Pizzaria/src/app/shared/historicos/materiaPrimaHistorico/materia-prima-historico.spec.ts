
import { TestBed } from '@angular/core/testing';
import { HistoricoMateriaPrimaService }  from '../materiaPrimaHistorico/materia-prima-historico.service'


describe('ProdutoService', () => {
  let service: HistoricoMateriaPrimaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoricoMateriaPrimaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
