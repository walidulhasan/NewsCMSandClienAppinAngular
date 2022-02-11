import { A, COMMA, ENTER } from '@angular/cdk/keycodes';
import { formatDate } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AuthorService } from 'src/app/services/author.service';
import { BlogService } from 'src/app/services/blog.service';
import { CategoryService } from 'src/app/services/category.service';

//ck editor
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

declare var $: any; // for use jauery

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})

export class UpdatePostComponent implements OnInit {

  //ck editor
  public Editor = ClassicEditor;

  durationInSeconds = 5;
  updatePostForm:FormGroup=new FormGroup({});
  selectedFile!: File;

  listAuthors : any;
  listCategories : any;
  blogId: any;
  blogDetails:any;
  DataLoaded: boolean=false;
  i:number = 1;


  //chips starts here
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  alltags:any;
  tagCloud : string = '';
  fruits: string[] = ['Programming'];
  allFruits: string[] = [];

  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;
  //chips end


  constructor(private formBuilder:FormBuilder,
    private blogservice:BlogService,
    private _snackBar: MatSnackBar,
    private authorservice:AuthorService,
    private categoryservice:CategoryService,
    private activatedRoute: ActivatedRoute,
    private title:Title) {
      this.title.setTitle("Edit Post");
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
      this._snackBar.open("Data updated successfully","Ok", {
        //duration: this.durationInSeconds * 1000,
      });
    }

  ngOnInit(): void {
    this.DataLoaded = false;
    this.GetCategories();
    this.GetAuthors()
    //this.fruits = ['Design', 'Programming'];
    this.activatedRoute.params.subscribe(data=>{
      this.blogId=data.id;
      console.log("ok: "+this.blogId);
    });
    if(this.blogId){
      this.blogservice.viewPost(this.blogId).toPromise().then(data=>{
        this.blogDetails=data;

        this.fruits = this.blogDetails.tags.split(',');
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
        this.updatePostForm=this.formBuilder.group({
          'newsId' : new FormControl(this.blogDetails.newsId),
          'Title' : new FormControl(this.blogDetails.title),
          'Slug' : new FormControl(this.blogDetails.slug),
          'Body' : new FormControl(this.blogDetails.body,[Validators.required,Validators.minLength(50)]),
          'ImageName' : new FormControl(),
          'ExtImageName': new FormControl(this.blogDetails.imageName),
          'CategoryId':new FormControl(this.blogDetails.categoryId,[Validators.required]),
          'reporterId':new FormControl(this.blogDetails.reporterId,[Validators.required]),
          'Availability': new FormControl(this.blogDetails.availability=='Published'?true:false),
          'CreatedAt':new FormControl(this.blogDetails.createdAt),
          'UpdatedAt':new FormControl(date.toISOString().substring(0,10))
        });
        this.DataLoaded = true;
      })
    }

    //then again

  }

  fileChanged(event:any) {
    this.selectedFile = event.target.files[0];
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

  EditPost(){
    var tzoffset = (new Date()).getTimezoneOffset() * 60000;
    let fd = new FormData();


    const data = {
      newsId: this.updatePostForm.value["newsId"],
      title: this.updatePostForm.value["Title"],
      slug: this.updatePostForm.value["Slug"],
      tags: this.fruits.toString(),
      body: this.updatePostForm.value["Body"],
      imageName: this.updatePostForm.value["ImageName"],
      extImageName: this.updatePostForm.value["ExtImageName"],
      categoryId: this.updatePostForm.value["CategoryId"],
      reporterId: this.updatePostForm.value["reporterId"],
      availability: this.updatePostForm.value["Availability"]?'Published':'Draft',
      createdAt: (new Date(this.updatePostForm.value["CreatedAt"] - tzoffset)).toISOString().substring(0,10),
      updatedAt: this.updatePostForm.value["UpdatedAt"],
    };

    fd.append("newsId", data.newsId);
    fd.append("title", data.title);
    fd.append("slug", data.slug);
    fd.append("tags", data.tags);
    fd.append("body", data.body);
    fd.append("imageName", data.imageName);
    fd.append("extImageName",data.extImageName);
    fd.append("categoryId", data.categoryId);
    fd.append("reporterId", data.reporterId);
    fd.append("availability", data.availability);
    fd.append("createdAt", data.createdAt);
    fd.append("updatedAt", data.updatedAt);
    if(this.selectedFile != null){
      fd.append("image",this.selectedFile,this.selectedFile.name)
    }

    console.log(data);
    this.blogservice.editPost(data.newsId, fd).subscribe(data=>{

      console.log("Data saved");

      let snackBarRef = this._snackBar.open('Post updated successfully', 'Ok');
      snackBarRef.afterDismissed().subscribe(() => {

      });
      window.location.href = "/dashboard/blog/list";

    },err=>{
      console.log(err);
    })
  }

}
