import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEntryPage } from './add-entry.page';

describe('AddEntryPage', () => {
  let component: AddEntryPage;
  let fixture: ComponentFixture<AddEntryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEntryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEntryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
