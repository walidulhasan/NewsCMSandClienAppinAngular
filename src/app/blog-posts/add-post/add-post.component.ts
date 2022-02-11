import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { AuthorService } from 'src/app/services/author.service';
import { BlogService } from 'src/app/services/blog.service';
import { CategoryService } from 'src/app/services/category.service';

//declare var $: any; // for use jauery

import * as $ from 'jquery';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  durationInSeconds = 5;
  addPostForm:FormGroup=new FormGroup({});
  selectedFile!: File;

  listAuthors : any;
  Categories : any;

  //spinner
  saving:boolean=false;

  //admin
  admin:boolean=true

  constructor(private formBuilder:FormBuilder,
    private blogservice:BlogService,
    private _snackBar: MatSnackBar,
    private authorservice:AuthorService,
    private categoryservice:CategoryService,
    private titleservice:Title){
      this.titleservice.setTitle("Add new post");
    }

  openSnackBar() {
    this._snackBar.open("Data saved successfully","", {
      duration: this.durationInSeconds * 1000,
      data:"Data saved",
    });
  }

  ngOnInit(): void {

    this.getCats();
    this.GetAuthors();

    const date = new Date();
    this.addPostForm=this.formBuilder.group({
      'Title' : new FormControl('',Validators.required),
      'Body' : new FormControl('',[Validators.required,Validators.minLength(50)]),
      'ImageName' : new FormControl(''),
      'CategoryId':new FormControl('',[Validators.required]),
      'AuthorId':new FormControl('',[Validators.required]),
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

  //get all author list
  getCats(){
    this.categoryservice.listCategories().subscribe(data => {
      this.Categories = data;
      console.log(this.Categories);

    });
  }

  createPost(){
    var tzoffset = (new Date()).getTimezoneOffset() * 60000;
    let fd = new FormData();
    this.saving=true;

    const data = {
      title: this.addPostForm.value["Title"],
      body: this.addPostForm.value["Body"],
      imageName: this.addPostForm.value["ImageName"],
      categoryId: this.addPostForm.value["CategoryId"],
      authorId: this.addPostForm.value["AuthorId"],
      availability: this.addPostForm.value["Availability"]?'Published':'Draft',
      createdAt: (new Date(this.addPostForm.value["CreatedAt"] - tzoffset)).toISOString().substring(0,10),
      updatedAt: this.addPostForm.value["UpdatedAt"],
    };

    fd.append("title", data.title);
    fd.append("body", data.body);
    fd.append("imageName", data.imageName);
    fd.append("categoryId", data.categoryId);
    fd.append("authorId", data.authorId);
    fd.append("availability", data.availability);
    fd.append("createdAt", data.createdAt);
    fd.append("updatedAt", data.updatedAt);

    fd.append("image",this.selectedFile,this.selectedFile.name)

    console.log(data.availability);
    setTimeout(() => {
      this.blogservice.addPost(fd).subscribe(data=>{
        this.addPostForm.reset({});
        this.saving=false;
        console.log("Data saved");
        let snackBarRef = this._snackBar.open('Post saved successfully', 'Ok');
        snackBarRef.afterDismissed().subscribe(() => {
          window.location.href = "/admin/blog/list";
        });
      },err=>{
        console.log(err);
      })
    }, 5000);

  }



}
