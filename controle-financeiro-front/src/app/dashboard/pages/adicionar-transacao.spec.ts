import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarTransacao } from './adicionar-transacao.component';

describe('AdicionarTransacao', () => {
  let component: AdicionarTransacao;
  let fixture: ComponentFixture<AdicionarTransacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdicionarTransacao],
    }).compileComponents();

    fixture = TestBed.createComponent(AdicionarTransacao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
