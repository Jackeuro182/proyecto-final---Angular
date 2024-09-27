import { Component, OnInit, ViewChild } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';
import { MatTableDataSource } from '@angular/material/table';
import { Patient } from 'src/app/models/patient';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from 'src/app/material/material.module';
import { RouterLink, RouterOutlet } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-patient',
  standalone: true,
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
  imports: [MaterialModule, RouterLink, RouterOutlet],
})
export class PatientComponent implements OnInit  {
  dataSource: MatTableDataSource<Patient>;
  displayedColumns: string[] = [
    'idPatient',
    'firstName',
    'lastName',
    'dni',
    'actions',
  ];
  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  totalElements: number = 0;
  private _liveAnnouncer: any;

  constructor(
    private patientService: PatientService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    /*this.patientService.findAll().subscribe((data) => {
      this.createTable(data);
    });*/

    this.patientService.listPageable(0, 2).subscribe((data) => {
      this.totalElements = data.totalElements;
      this.createTable(data.content); /////////////////////AQUIIIIII
    });

    // reflejar los cambios reactivos
    this.patientService.getPatientChange().subscribe((data) => {
      this.createTable(data);
    });

    this.patientService.getMessageChange().subscribe((data) => {
      this._snackBar.open(data, 'INFO', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    });
  }

  createTable(data: Patient[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
  }
  

  delete(idPatient: number) {
    this.patientService
      .delete(idPatient)
      .pipe(switchMap(() => this.patientService.findAll()))
      .subscribe((data) => {
        this.patientService.setPatientChange(data);
        this.patientService.setMessageChange('DELETED');
      });
  }

  applyFilter(e: Event) {
    const inputElement = e.target as HTMLInputElement;
    this.dataSource.filter = inputElement.value.trim();
  }

  showMore(e: any) {
    this.patientService
      .listPageable(e.pageIndex, e.pageSize)
      .subscribe((data) => {
        this.totalElements = data.totalElements;
        this.createTable(data.content);
      });
  }

 
}
