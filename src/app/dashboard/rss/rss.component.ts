import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { CategoryModel } from 'src/app/models/category-model';
import { AuthorService } from 'src/app/services/author.service';
import { CategoryService } from 'src/app/services/category.service';
import { RssService } from 'src/app/services/rss.service';

@Component({
  selector: 'app-rss',
  templateUrl: './rss.component.html',
  styleUrls: ['./rss.component.css']
})

export class RssComponent implements OnInit {

  addCatForm:FormGroup=new FormGroup({});
  Categories:any = [];
  listCategories : any;
  CatEditInfo:any;


  dataSource: MatTableDataSource<CategoryModel> = new MatTableDataSource(this.Categories);
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  displayedColumns: string[] = ['rssId', 'categoryId','limit','permalink', 'Action'];

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
    private subCatsService:RssService,
    private elRef: ElementRef,
    private _snackBar: MatSnackBar,
    private titleservice:Title,
    private authorservice:AuthorService) {
    this.titleservice.setTitle("RSS");
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

  //initial form fields
  initialForm(){
    this.addCatForm=this.formBuilder.group({
      'rssId' : new FormControl(''),
      'categoryId' : new FormControl('',Validators.required),
      'limit' : new FormControl('',Validators.required),
      'permalink' : new FormControl('',Validators.required)

    });
  }

  //get all subCategory list
  getsubCats(){
    this.subCatsService.listsubCategories().subscribe(data => {
      this.Categories = data;
      console.log(data);
      this.dataSource.data=this.Categories;
      this.dataSource.paginator = this.paginator;
    });
  }
  // createRss(){
  //   this.saving=true;
  //     const BId = {
  //       categoryId: this.addCatForm.value["categoryId"],
  //   };
  //     const rssSave={
  //       categoryId: this.addCatForm.value["categoryId"],
  //       limit: this.addCatForm.value["limit"],
  //       permalink: this.addCatForm.value["permalink"]
  //     };
  //     setTimeout(() => {
  //       if (BId.categoryId != '') {
  //         this.subCatsService.addsubCat(rssSave).subscribe(data=>{
  //           this.addCatForm.reset({});
  //           this.saving=false;
  //           this.getsubCats();
  //           let snackBarRef = this._snackBar.open('Category saved successfully', 'Ok');
  //           snackBarRef.afterDismissed().subscribe(() => {

  //           });
  //         },err=>{
  //           let snackBarRef = this._snackBar.open('Category Can not Save successfully', 'OH');
  //           snackBarRef.afterDismissed().subscribe(() => {

  //           });
  //         })
  //       }
  //     }, 1500);
  // }

  //create createCat
  createCat(){
    //start loading
    this.saving=true;
    //get data from form
    const aId = {
      rssId: this.addCatForm.value["rssId"],
    };
    const catSave={
      categoryId: this.addCatForm.value["categoryId"],
      limit: this.addCatForm.value["limit"],
      permalink: this.addCatForm.value["permalink"],
    }
    const catUpdate={
      rssId: this.addCatForm.value["rssId"],
      categoryId: this.addCatForm.value["categoryId"],
      limit: this.addCatForm.value["limit"],
      permalink:this.addCatForm.value["permalink"]
    }
    setTimeout(() => {
      if (aId.rssId == '') {
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
      else if (aId.rssId != '') {
        this.subCatsService.subcatUpdateBy(aId.rssId, catUpdate).subscribe(data=>{
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
        'rssId' : new FormControl(this.CatEditInfo.rssId,Validators.required),
        'categoryId' : new FormControl(this.CatEditInfo.categoryId,Validators.required),
        'limit' : new FormControl(this.CatEditInfo.limit,Validators.required),
        'permalink' : new FormControl(this.CatEditInfo.permalink,Validators.required),
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
  //Tabil Data Filter
  applyFilter($event:any){
  this.dataSource.filter=$event.target.value;
  }
}
