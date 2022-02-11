import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';

import { Authorsmodel } from 'src/app/models/authorsmodel';
import { AuthorService } from 'src/app/services/author.service';
import { ComputerService } from 'src/app/services/computer.service';
import { CountryService } from 'src/app/services/country.service';
import { DesignationService } from 'src/app/services/designation.service';
import { GenderService } from 'src/app/services/gender.service';

var md5=require("blueimp-md5");

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {

  addAuthorForm:FormGroup=new FormGroup({});
  authors:any = [];
  genderList:any;
  countryList:any;
  designationList:any;
  computerList:any;
  authorEditInfo:any;
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;
  dataSource: MatTableDataSource<Authorsmodel> = new MatTableDataSource(this.authors);
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  displayedColumns: string[] = ['reporterId','Name','Email','Image','Action'];


  //spinner
  saving:boolean=false;

  //show hide id field
  showId:boolean = false;

  //show hide clear button
  showClearBtn:boolean = false;

  //token
  today:any="";
  token: any;
  authorDetails: any;

  constructor(
    private formBuilder:FormBuilder,
    private authorservice:AuthorService,
    private genderService:GenderService,
    private countryService:CountryService,
    private designationService:DesignationService,
    private computerService:ComputerService,
    private _snackBar: MatSnackBar,
    private titleservice:Title
    ) {
    this.titleservice.setTitle("Staff");
  }

  getCommenterPic(email:string){
    return "https://gravatar.com/avatar/"+md5(email);
  }

  ngOnInit(): void {
    this.GetCountry();
    this.GetDesignation();
    this.GetComputer();
    this.GetGender();
    this.getAuthors();
    this.getU();
    this.initialForm();
  }

  getU(){
    this.token = localStorage.getItem('Mahmud_auth');
    if(this.token){
      this.authorservice.authorById(JSON.parse(atob(this.token.split('.')[1]))["iss"]).subscribe(x=>{
        this.authorDetails=x;
        if (this.authorDetails?.role != "Admin") {
          window.location.href="/dashboard";
        }
      })
    }
  }

  //initial form fields
  initialForm(){
    this.addAuthorForm=this.formBuilder.group({
      'reporterId' : new FormControl(''),
      'Name' : new FormControl('',Validators.required),
      'Role' : new FormControl('',Validators.required),
      'Email' : new FormControl('',Validators.required),
      'password' : new FormControl('',Validators.required),
      'Dob' : new FormControl('',Validators.required),
      'reporterFatherName' : new FormControl('',Validators.required),
      'reporterMotherName' : new FormControl('',Validators.required),
      'NationalId' : new FormControl('',Validators.required),
      'countryId' : new FormControl('',Validators.required),
      'reporterPresentAddress' : new FormControl('',Validators.required),
      'reporterAppointedDate' : new FormControl('',Validators.required),
      'designationId' : new FormControl('',Validators.required),
      'computerId' : new FormControl('',Validators.required),
      'aboutReporter' : new FormControl('',Validators.required),
      'permanentTemporary' : new FormControl('',Validators.required),
      'genderId' : new FormControl('',Validators.required),

    });
  }

  //create user
  createAuthor(){
    //start loading
    this.saving=true;
    //get data from form
    const aId = {
      reporterId: this.addAuthorForm.value["reporterId"],
    };
    const authorSave={
      Name: this.addAuthorForm.value["Name"],
      Role: this.addAuthorForm.value["Role"],
      Email: this.addAuthorForm.value["Email"],
      password: this.addAuthorForm.value["password"],
      Dob: this.addAuthorForm.value["Dob"],
      reporterFatherName: this.addAuthorForm.value["reporterFatherName"],
      reporterMotherName: this.addAuthorForm.value["reporterMotherName"],
      NationalId: this.addAuthorForm.value["NationalId"],
      countryId: this.addAuthorForm.value["countryId"],
      reporterPresentAddress: this.addAuthorForm.value["reporterPresentAddress"],
      reporterAppointedDate: this.addAuthorForm.value["reporterAppointedDate"],
      designationId: this.addAuthorForm.value["designationId"],
      computerId: this.addAuthorForm.value["computerId"],
      aboutReporter: this.addAuthorForm.value["aboutReporter"],
      permanentTemporary: this.addAuthorForm.value["permanentTemporary"]?'Permanent':'Temporary',
      genderId: this.addAuthorForm.value["genderId"]

    }
    const authorUpdate={
      reporterId: this.addAuthorForm.value["reporterId"],
      Name: this.addAuthorForm.value["Name"],
      Role: this.addAuthorForm.value["Role"],
      Email: this.addAuthorForm.value["Email"],
      password: this.addAuthorForm.value["password"],
      Dob: this.addAuthorForm.value["Dob"],
      reporterFatherName: this.addAuthorForm.value["reporterFatherName"],
      reporterMotherName: this.addAuthorForm.value["reporterMotherName"],
      NationalId: this.addAuthorForm.value["NationalId"],
      countryId: this.addAuthorForm.value["countryId"],
      reporterPresentAddress: this.addAuthorForm.value["reporterPresentAddress"],
      reporterAppointedDate: this.addAuthorForm.value["reporterAppointedDate"],
      designationId: this.addAuthorForm.value["designationId"],
      computerId: this.addAuthorForm.value["computerId"],
      aboutReporter: this.addAuthorForm.value["aboutReporter"],
      permanentTemporary: this.addAuthorForm.value["permanentTemporary"]?'Permanent':'Temporary',
      genderId: this.addAuthorForm.value["genderId"]
    }
    setTimeout(() => {
      if (aId.reporterId == '') {
        this.authorservice.addAuthor(authorSave).subscribe(data=>{
          this.addAuthorForm.reset({});
          this.saving=false;

          let snackBarRef = this._snackBar.open('Author saved successfully', 'Ok');
          snackBarRef.afterDismissed().subscribe(() => {
            this.getAuthors();
          });
        },err=>{
          console.log(err);
        })
      }
      else if (aId.reporterId != '') {
        this.authorservice.authorUpdateBy(aId.reporterId, authorUpdate).subscribe(data=>{
          this.addAuthorForm.reset({});
          this.saving=false;
          this.showClearBtn = false;
          this.getAuthors();
          let snackBarRef = this._snackBar.open('Author updated successfully', 'Ok');
          snackBarRef.afterDismissed().subscribe(() => {

          });
        },err=>{
          console.log(err);
        })
      }
    }, 1500);
  }

  //get all author list
  getAuthors(){
    this.authorservice.listAuthors().subscribe(data => {
      this.authors = data;
      this.dataSource.data=this.authors;
      this.dataSource.paginator = this.paginator;
    });
  }

  //edit author
  editAuthor(id:any){
    this.showId=true;
    this.showClearBtn = true;
    const newLocal = this;
    newLocal.authorservice.authorById(id).subscribe(a=>{
      this.authorEditInfo=a;
      this.addAuthorForm=this.formBuilder.group({
        'reporterId' : new FormControl(this.authorEditInfo.authorId,Validators.required),
        'Name' : new FormControl(this.authorEditInfo.name,Validators.required),
        'Dob' : new FormControl(this.authorEditInfo.dob,Validators.required),
        'Role' : new FormControl(this.authorEditInfo.role,Validators.required),
        'About' : new FormControl(this.authorEditInfo.about,Validators.required),
        'Email' : new FormControl(this.authorEditInfo.email,Validators.required),
        'Password' : new FormControl(this.authorEditInfo.password,Validators.required),
      });
    })
  }

  //clear form
  clearForm(){
    this.addAuthorForm.reset();
    this.showId = false;
    this.showClearBtn = false;
  }
   //Tabil Data Filter
   applyFilter($event:any){
    this.dataSource.filter=$event.target.value;
  }


  //FK Table List

  //category ID
   GetGender(){
    this.genderService.listComputers().subscribe(data => {
      this.genderList = data;
    });
  }
  //Computer ID
  GetComputer(){
    this.computerService.listComputers().subscribe(data => {
      this.computerList = data;
    });
  }
  //Designation ID
  GetDesignation(){
    this.designationService.listComputers().subscribe(data => {
      this.designationList = data;
    });
  }
  //Country ID
  GetCountry(){
    this.countryService.listComputers().subscribe(data => {
      this.countryList = data;;
    });
  }

}
