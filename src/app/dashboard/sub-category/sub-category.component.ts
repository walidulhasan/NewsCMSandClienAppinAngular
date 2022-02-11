import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { CategoryModel } from 'src/app/models/category-model';
import { AuthorService } from 'src/app/services/author.service';
import { CategoryService } from 'src/app/services/category.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})

export class SubCategoryComponent implements OnInit {

  addCatForm:FormGroup=new FormGroup({});
  Categories:any = [];
  listCategories : any;
  CatEditInfo:any;
  @ViewChild(MatSort) sort!: MatSort;


  dataSource = new MatTableDataSource(this.Categories);
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  displayedColumns: string[] = ['subCategoryId', 'SubCategoryName','CategoryName', 'Action'];

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
    private catservice:CategoryService,
    private subCatsService:SubcategoryService,
    private elRef: ElementRef,
    private _snackBar: MatSnackBar,
    private titleservice:Title,
    private authorservice:AuthorService) {
    this.titleservice.setTitle("SubCategory");
  }

  ngOnInit(): void {
    this.GetCategories();
    this.initialForm();
    this.getsubCats();
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
  //Tabil Data Filter
  applyFilter($event:any){
    this.dataSource.filter=$event.target.value;
  }

  //initial form fields
  initialForm(){
    this.addCatForm=this.formBuilder.group({
      'subCategoryId' : new FormControl(''),
      'SubCategoryName' : new FormControl('',Validators.required),
      'CategoryName' : new FormControl('',Validators.required)
    });
  }

  //get all subCategory list
  getsubCats(){
    this.subCatsService.listsubCategories().subscribe(data => {
      this.Categories = data;
      console.log(data);
      this.dataSource=new MatTableDataSource(this.Categories);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort=this.sort;
    });
  }

  //create createCat
  createCat(){
    //start loading
    this.saving=true;
    //get data from form
    const aId = {
      subCategoryId: this.addCatForm.value["subCategoryId"],
    };
    const catSave={
      subCategoryName: this.addCatForm.value["SubCategoryName"],
      categoryId: this.addCatForm.value["CategoryName"],
    }
    const catUpdate={
      subCategoryId: this.addCatForm.value["subCategoryId"],
      subCategoryName: this.addCatForm.value["SubCategoryName"],
      categoryId: this.addCatForm.value["CategoryName"]
    }
    setTimeout(() => {
      if (aId.subCategoryId == '') {
        this.subCatsService.addsubCat(catSave).subscribe(data=>{
          this.addCatForm.reset({});
          this.saving=false;
          this.getsubCats();
          let snackBarRef = this._snackBar.open('Category saved successfully', 'Ok');
          snackBarRef.afterDismissed().subscribe(() => {

          });
          window.location.reload();
        },err=>{
          console.log(err);
        })
      }
      else if (aId.subCategoryId != '') {
        this.subCatsService.subcatUpdateBy(aId.subCategoryId, catUpdate).subscribe(data=>{
          this.addCatForm.reset({});
          this.showClearBtn = false;
          this.saving=false;
          this.getsubCats();
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
    newLocal.subCatsService.subCatById(id).subscribe(a=>{
      this.CatEditInfo=a;
      this.addCatForm=this.formBuilder.group({
        'subCategoryId' : new FormControl(this.CatEditInfo.subCategoryId,Validators.required),
        'SubCategoryName' : new FormControl(this.CatEditInfo.subCategoryName,Validators.required),
        'CategoryName' : new FormControl(this.CatEditInfo.categoryId,Validators.required),
      });
    })
  }

  //delete cat
  DeletePost(id:any): void {
    console.log(this.elRef.nativeElement.parentElement);
    if(confirm("Are you sure to delete?")){
      this.subCatsService.deletesubCat(id)
      .subscribe(
        response => {
          this.openSnackBar("Data deleted successfully");
          this.getsubCats();
        },
        error => {
          this.openSnackBar("Oops! Somethis went wrong");
        });
    }
  }
  //category ID
  GetCategories(){
    this.catservice.listCategories().subscribe(data => {
      this.listCategories = data;
    });
  }
}




