import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { CategoryModel } from 'src/app/models/category-model';
import { AuthorService } from 'src/app/services/author.service';
import { ComputerService } from 'src/app/services/computer.service';

@Component({
  selector: 'app-computer',
  templateUrl: './computer.component.html',
  styleUrls: ['./computer.component.css']
})

export class ComputerComponent implements OnInit {

  addCatForm:FormGroup=new FormGroup({});
  Categories:any = [];
  CatEditInfo:any;
  dataSource: MatTableDataSource<CategoryModel> = new MatTableDataSource(this.Categories);
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  displayedColumns: string[] = ['Id', 'Name', 'Action'];

  //spinner
  saving:boolean=false;

  //show hide id field
  showId:boolean = false;

  //show hide clear button
  showClearBtn:boolean = false;

  durationInSeconds = 5;
  //for Delete
  openSnackBar(msg:any) {
    this._snackBar.open(msg,"", {
      duration: this.durationInSeconds * 1000,
      data:"Data saved",
    });
  }

  //todays date
  today:any="";
  token: any;
  authorDetails: any;

  constructor(private formBuilder:FormBuilder,
    private computerservice:ComputerService,
    private elRef: ElementRef,
    private _snackBar: MatSnackBar,
    private titleservice:Title,
    private authorservice:AuthorService) {
    this.titleservice.setTitle("Computers");
  }

  ngOnInit(): void {
    this.initialForm();
    this.getCats();
    this.getU();
  }

  getU(){
    this.token = localStorage.getItem('Mahmud_auth');
    if(this.token){
      this.authorservice.authorById(JSON.parse(atob(this.token.split('.')[1]))["iss"]).subscribe(x=>{
        this.authorDetails=x;
        if (this.authorDetails.role != "Admin") {
          window.location.href="/dashboard";
        }
      })
    }
  }

  //initial form fields
  initialForm(){
    this.addCatForm=this.formBuilder.group({
      'Id' : new FormControl(''),
      'Name' : new FormControl('',Validators.required),
    });
  }

  //get all author list
  getCats(){
    this.computerservice.listComputers().subscribe(data => {
      this.Categories = data;
      console.log(data);
      this.dataSource.data=this.Categories;
      this.dataSource.paginator = this.paginator;
    });
  }

  //create createCat
  createCat(){
    //start loading
    this.saving=true;
    //get data from form
    const aId = {
      computerId: this.addCatForm.value["Id"],
    };
    const catSave={
      computerIp: this.addCatForm.value["Name"],
    }
    const catUpdate={
      computerId: this.addCatForm.value["Id"],
      computerIp: this.addCatForm.value["Name"],
    }
    setTimeout(() => {
      if (aId.computerId == '') {
        this.computerservice.addComputers(catSave).subscribe(data=>{
          this.addCatForm.reset({});
          this.saving=false;
          this.getCats();
          let snackBarRef = this._snackBar.open('Category saved successfully', 'Ok');
          snackBarRef.afterDismissed().subscribe(() => {

          });
          window.location.reload();
        },err=>{
          console.log(err);
        })
      }
      else if (aId.computerId != '') {
        this.computerservice.ComputersUpdateBy(aId.computerId, catUpdate).subscribe(data=>{
          this.addCatForm.reset({});
          this.showClearBtn = false;
          this.saving=false;
          this.getCats();
          let snackBarRef = this._snackBar.open('Category updated successfully', 'Ok');
          snackBarRef.afterDismissed().subscribe(() => {
          });
          window.location.reload();
        },err=>{
          console.log(err);
        })
      }
    }, 1500);
  }

  //clear form
  clearForm(){
    this.addCatForm.reset();
    this.showId = false;
    this.showClearBtn = false;
  }

  //edit cat
  editCat(id:any){
    this.showId=true;
    this.showClearBtn = true;
    const newLocal = this;
    newLocal.computerservice.ComputersById(id).subscribe(a=>{
      this.CatEditInfo=a;
      console.log(a);
      this.addCatForm=this.formBuilder.group({
        'Id' : new FormControl(this.CatEditInfo.computerId,Validators.required),
        'Name' : new FormControl(this.CatEditInfo.computerIp,Validators.required),
      });
    })
  }

  //delete cat
  DeletePost(id:any): void {
    console.log(this.elRef.nativeElement.parentElement);
    if(confirm("Are you sure to delete?")){
      this.computerservice.deleteComputers(id)
      .subscribe(
        response => {
          this.openSnackBar("Data deleted successfully");
          this.getCats();
        },
        error => {
          this.openSnackBar("Oops! Somethis went wrong");
        });
    }
  }
   //Tabil Data Filter
   applyFilter($event:any){
    this.dataSource.filter=$event.target.value;
  }
}

