import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RegisterComponent } from '../register.component';

@Component({
  selector: 'app-pre-view',
  templateUrl: './pre-view.component.html',
  styleUrls: ['./pre-view.component.scss']
})
export class PreViewComponent implements OnInit {
  imagePath:any;
  constructor(public dialogRef: MatDialogRef<RegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) {
      // var reader = new FileReader();
      // this.imagePath = data.logo;
      // reader.readAsDataURL(files[0]); 
      // reader.onload = (_event) => { 
      //   this.imgURL = reader.result; 
    //  }
    }
  ngOnInit() {
    console.log(this.data);
    
  }

}

