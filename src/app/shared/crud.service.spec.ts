import { componentFactoryName } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { EMPTY, from, of } from 'rxjs';

import { CrudService } from './crud.service';
import { Students } from './student-mock-data';

fdescribe('CrudService', () => {
  let service: CrudService;
  let afs: AngularFirestore;

  const data = from(Students);

  const insideCollection = jasmine.createSpyObj('collection', [
    'doc',
    'valueChanges',
  ]);
  const insideDocs = jasmine.createSpyObj('doc', [
    'get',
    'update',
    'delete',
    'set',
  ]);

  const fakeAfs = jasmine.createSpyObj('AngularFirestore', ['collection']);
  fakeAfs.collection.and.returnValue(insideCollection);
  insideCollection.valueChanges.and.returnValue(data);
  insideCollection.doc.and.returnValue(insideDocs);
  insideDocs.get.and.returnValue(data);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AngularFirestore, useValue: fakeAfs }],
    });

    afs = TestBed.inject(AngularFirestore);
    service = TestBed.inject(CrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(fakeAfs.collection).toHaveBeenCalledWith('students');
  });

  it('should get all students', (done: DoneFn) => {
    let data = [];
    service.getStudents().subscribe((value) => {
      data.push(value);
      done();
    });
    expect(data).toEqual(Students);
  });

  it('should get one student', () => {
    let spy = spyOn(service, 'getOneStudent').and.returnValue(EMPTY);
    service.getOneStudent('1').subscribe();

    expect(spy).toHaveBeenCalledWith('1');
  });
});
