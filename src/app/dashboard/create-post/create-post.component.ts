import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {A, COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { AuthorService } from 'src/app/services/author.service';
import { BlogService } from 'src/app/services/blog.service';
import { CategoryService } from 'src/app/services/category.service';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  durationInSeconds = 5;
  addPostForm:FormGroup=new FormGroup({});
  selectedFile!: File;
  listAuthors : any;
  listCategories : any;

  //spinner
  saving:boolean=false;

  //ck editor
  public Editor = ClassicEditor;

  //chips starts here
  selectable = true;
  removable = true;
  alltags:any;
  tagCloud : string = '';
  i:number = 1;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = [];
  allFruits: string[] = [];

  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;
  token: any;
  authorDetails: any;
  //chips end

  constructor(private formBuilder:FormBuilder,
    private blogservice:BlogService,
    private _snackBar: MatSnackBar,
    private authorservice:AuthorService,
    private categoryservice:CategoryService,
    private titleservice:Title) {
      this.titleservice.setTitle("Add new post");
      //chips start
      this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
      //chips end
    }

    //chips
    add(event: MatChipInputEvent): void {
      const value = (event.value || '').trim();

      // Add our fruit
      if (value) {
        this.fruits.push(value);
      }
      // Clear the input value
      event.chipInput!.clear();
      this.fruitCtrl.setValue(null);
    }

    remove(fruit: string): void {
      const index = this.fruits.indexOf(fruit);

      if (index >= 0) {
        this.fruits.splice(index, 1);
      }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
      this.fruits.push(event.option.viewValue);
      this.fruitInput.nativeElement.value = '';
      this.fruitCtrl.setValue(null);
    }

    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();

      return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
    }
    //chips end

    openSnackBar() {
      this._snackBar.open("Data saved successfully","", {
        duration: this.durationInSeconds * 1000,
        data:"Data saved",
      });
    }

  ngOnInit(): void {
    this.GetCategories();
    this.GetAuthors();

    this.blogservice.listBlogs().subscribe(t=>{
      this.alltags=t;
      this.alltags.forEach((a: any) => {
        this.i++;
        this.tagCloud += a.tags;
        if(this.i <= this.alltags.length){
          this.tagCloud += ',';
        }
      });

      this.allFruits = this.tagCloud.split(',').map(item => item).filter((value, index, self) => self.indexOf(value) === index);

    })
    const date = new Date();
    //loggedin author
    this.token = localStorage.getItem('Mahmud_auth');
    this.authorservice.authorById(JSON.parse(atob(this.token.split('.')[1]))["iss"]).subscribe(x=>{
      this.authorDetails=x;
    })

    this.addPostForm=this.formBuilder.group({
      'Title' : new FormControl('',Validators.required),
      'Body' : new FormControl('',[Validators.required,Validators.minLength(50)]),
      'ImageName' : new FormControl(''),
      'CategoryId':new FormControl('',[Validators.required]),
      'Availability': new FormControl(''),
      'CreatedAt':new FormControl(''),
      'UpdatedAt':new FormControl(date.toISOString().substring(0,10))
    });
  }

  fileChanged(event:any) {
    this.selectedFile = event.target.files[0];
    $('button').val('Save');
  }
  GetAuthors(){
    this.authorservice.listAuthors().subscribe(data => {
      this.listAuthors = data;
    });
  }

  GetCategories(){
    this.categoryservice.listCategories().subscribe(data => {
      this.listCategories = data;
    });
  }

  createPost(){
    var tzoffset = (new Date()).getTimezoneOffset() * 60000;
    let fd = new FormData();
    this.saving=true;

    const data = {
      title: this.addPostForm.value["Title"],
      slug: this.addPostForm.value["Title"].replace(/\s/g, "-"),
      body: this.addPostForm.value["Body"],
      tags: this.fruits.toString(),
      views: 0,
      imageName: this.addPostForm.value["ImageName"],
      categoryId: this.addPostForm.value["CategoryId"],
      reporterId: this.authorDetails.reporterId,
      availability: this.addPostForm.value["Availability"]?'Published':'Draft',
      createdAt: (new Date(this.addPostForm.value["CreatedAt"] - tzoffset)).toISOString().substring(0,10),
      updatedAt: this.addPostForm.value["UpdatedAt"],
    };

    fd.append("title", data.title);
    fd.append("slug", data.slug);
    fd.append("body", data.body);
    fd.append("tags", data.tags);
    fd.append("views", String(data.views)),
    fd.append("imageName", data.imageName);
    fd.append("categoryId", data.categoryId);
    fd.append("reporterId", data.reporterId);
    fd.append("availability", data.availability);
    fd.append("createdAt", data.createdAt);
    fd.append("updatedAt", data.updatedAt);

    fd.append("image",this.selectedFile,this.selectedFile.name)

    setTimeout(() => {
      this.blogservice.addPost(fd).subscribe(data=>{
        this.addPostForm.reset({});
        this.saving=false;
        console.log("Data saved");
        let snackBarRef = this._snackBar.open('Post saved successfully', 'Ok');
        snackBarRef.afterDismissed().subscribe(() => {

        });
        window.location.href = "/dashboard/blog/list";
      },err=>{
        console.log(err);
      })
    }, 3000);
  }


}
