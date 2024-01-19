import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-list-orders-modal',
  templateUrl: './list-orders-modal.component.html',
  styleUrls: ['./list-orders-modal.component.css']
})
export class ListOrderModalComponent implements OnInit {

  
  constructor(public dialogRef: MatDialogRef<ListOrderModalComponent>) {}
  
  cancel(): void {
    this.dialogRef.close('Cancelar');   
  }
  
  confirmLogout(): void {
    this.dialogRef.close('Cerrar Sesión');
  }
  
  ngOnInit(): void {
  }

}

