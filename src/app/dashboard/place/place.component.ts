import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { CategoryModel } from 'src/app/models/category-model';
import { AuthorService } from 'src/app/services/author.service';
import { PlaceService } from 'src/app/services/place.service';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})

export class PlaceComponent implements OnInit {

  addCatForm: FormGroup = new FormGroup({});
  Categories: any = [];
  listCategories: any;
  CatEditInfo: any;


  dataSource: MatTableDataSource<CategoryModel> = new MatTableDataSource(this.Categories);
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  displayedColumns: string[] = ['subCategoryId', 'SubCategoryName', 'CategoryName', 'Action'];

  //spinner
  saving: boolean = false;

  //show hide id field
  showId: boolean = false;

  //show hide clear button
  showClearBtn: boolean = false;

  durationInSeconds = 5;
  //for Delete
  openSnackBar(msg: any) {
    this._snackBar.open(msg, "", {
      duration: this.durationInSeconds * 1000,
      data: "Data saved",
    });
  }

  //todays date
  today: any = "";
  token: any;
  authorDetails: any;

  constructor(private formBuilder: FormBuilder,
    private authservice: AuthorService,
    private placeService: PlaceService,
    private elRef: ElementRef,
    private _snackBar: MatSnackBar,
    private titleservice: Title,
    private authorservice: AuthorService) {
    this.titleservice.setTitle("Speciality");
  }

  ngOnInit(): void {
    this.GetCategories();
    this.initialForm();
    this.getsubCats();
    this.getU();
  }

  getU() {
    this.token = localStorage.getItem('Mahmud_auth');
    if (this.token) {
      this.authorservice.authorById(JSON.parse(atob(this.token.split('.')[1]))["iss"]).subscribe(x => {
        this.authorDetails = x;
        if (this.authorDetails.role != "Admin") {
          window.location.href = "/dashboard";
        }
      })
    }
  }

  //initial form fields
  initialForm() {
    this.addCatForm = this.formBuilder.group({
      'subCategoryId': new FormControl(''),
      'SubCategoryName': new FormControl('', Validators.required),
      'CategoryName': new FormControl('', Validators.required)
    });
  }

  //get all subCategory list
  getsubCats() {
    this.placeService.listPlace().subscribe(data => {
      this.Categories = data;
      console.log(data);
      this.dataSource.data = this.Categories;
      this.dataSource.paginator = this.paginator;
    });
  }

  //create createCat
  createCat() {
    //start loading
    this.saving = true;
    //get data from form
    const aId = {
      placeId: this.addCatForm.value["subCategoryId"],
    };
    const catSave = {
      PlaceName: this.addCatForm.value["SubCategoryName"],
      reporterId: this.addCatForm.value["CategoryName"],
    }
    const catUpdate = {
      placeId: this.addCatForm.value["subCategoryId"],
      PlaceName: this.addCatForm.value["SubCategoryName"],
      reporterId: this.addCatForm.value["CategoryName"]
    }
    setTimeout(() => {
      if (aId.placeId == '') {
        this.placeService.addPlace(catSave).subscribe(data => {
          this.addCatForm.reset({});
          this.saving = false;
          this.getsubCats();
          let snackBarRef = this._snackBar.open('Category saved successfully', 'Ok');
          snackBarRef.afterDismissed().subscribe(() => {

          });
          window.location.reload();
        }, err => {
          console.log(err);
        })
      }
      else if (aId.placeId != '') {
        this.placeService.PlaceUpdateBy(aId.placeId, catUpdate).subscribe(data => {
          this.addCatForm.reset({});
          this.showClearBtn = false;
          this.saving = false;
          this.getsubCats();
          let snackBarRef = this._snackBar.open('Category updated successfully', 'Ok');
          snackBarRef.afterDismissed().subscribe(() => {
          });
          window.location.reload();
        }, err => {
          console.log(err);
        })
      }
    }, 1500);
  }

  //clear form
  clearForm() {
    this.addCatForm.reset();
    this.showId = false;
    this.showClearBtn = false;
  }

  //edit cat
  editCat(id: any) {
    this.showId = true;
    this.showClearBtn = true;
    const newLocal = this;
    newLocal.placeService.PlaceById(id).subscribe(a => {
      this.CatEditInfo = a;
      this.addCatForm = this.formBuilder.group({
        'subCategoryId': new FormControl(this.CatEditInfo.placeId, Validators.required),
        'SubCategoryName': new FormControl(this.CatEditInfo.placeName, Validators.required),
        'CategoryName': new FormControl(this.CatEditInfo.reporterId, Validators.required),
      });
    })
  }

  //delete cat
  DeletePost(id: any): void {
    console.log(this.elRef.nativeElement.parentElement);
    if (confirm("Are you sure to delete?")) {
      this.placeService.deletePlace(id)
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
  GetCategories() {
    this.authservice.listAuthors().subscribe(data => {
      this.listCategories = data;
    });
  }

  //Tabil Data Filter
  applyFilter($event:any){
    this.dataSource.filter=$event.target.value;
  }
}
