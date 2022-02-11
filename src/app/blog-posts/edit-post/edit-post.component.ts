import { formatDate } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AuthorService } from 'src/app/services/author.service';
import { BlogService } from 'src/app/services/blog.service';
import { CategoryService } from 'src/app/services/category.service';

declare var $: any; // for use jauery

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})

export class EditPostComponent implements OnInit {

  durationInSeconds = 5;
  editPostForm:FormGroup=new FormGroup({});
  selectedFile!: File;

  listAuthors : any;
  listCategories : any;
  blogId: any;
  blogDetails:any;
  DataLoaded: boolean=false;

  
  constructor(private formBuilder:FormBuilder,
    private blogservice:BlogService,
    private _snackBar: MatSnackBar,
    private authorservice:AuthorService,
    private categoryservice:CategoryService,
    private activatedRoute: ActivatedRoute,
    private title:Title) { 
      this.title.setTitle("Edit Post");
    }

    openSnackBar() {
      this._snackBar.open("Data updated successfully","Ok", {
        //duration: this.durationInSeconds * 1000,
      });
    }

  ngOnInit(): void {
    this.DataLoaded = false;
    this.GetCategories();
    this.GetAuthors()

    this.activatedRoute.params.subscribe(data=>{
      this.blogId=data.id;
    });
    if(this.blogId){
      this.blogservice.viewPost(this.blogId).toPromise().then(data=>{
        this.blogDetails=data;
        const date = new Date();
        this.editPostForm=this.formBuilder.group({
          'PostsId' : new FormControl(this.blogDetails.postsId),
          'Title' : new FormControl(this.blogDetails.title),
          'Body' : new FormControl(this.blogDetails.body,[Validators.required,Validators.minLength(50)]),
          'ImageName' : new FormControl(),
          'ExtImageName': new FormControl(this.blogDetails.imageName.substring(7)),
          'CategoryId':new FormControl(this.blogDetails.categoryId,[Validators.required]),
          'AuthorId':new FormControl(this.blogDetails.authorId,[Validators.required]),
          'Availability': new FormControl(this.blogDetails.availability),
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
      postsId: this.editPostForm.value["PostsId"],
      title: this.editPostForm.value["Title"],
      body: this.editPostForm.value["Body"],
      imageName: this.editPostForm.value["ImageName"],
      extImageName: this.editPostForm.value["ExtImageName"],
      categoryId: this.editPostForm.value["CategoryId"],
      authorId: this.editPostForm.value["AuthorId"],
      availability: this.editPostForm.value["Availability"]?'Published':'Draft',
      createdAt: (new Date(this.editPostForm.value["CreatedAt"] - tzoffset)).toISOString().substring(0,10),
      updatedAt: this.editPostForm.value["UpdatedAt"],
    };

    fd.append("postsId", data.postsId);
    fd.append("title", data.title);
    fd.append("body", data.body);
    fd.append("imageName", data.imageName);
    fd.append("extImageName",data.extImageName);
    fd.append("categoryId", data.categoryId);
    fd.append("authorId", data.authorId);
    fd.append("availability", data.availability);
    fd.append("createdAt", data.createdAt);
    fd.append("updatedAt", data.updatedAt);

    fd.append("image",this.selectedFile,this.selectedFile.name)
    
    console.log(data);
    this.blogservice.editPost(this.blogId, fd).subscribe(data=>{
      
      console.log("Data saved");

      let snackBarRef = this._snackBar.open('Post updated successfully', 'Ok');
      snackBarRef.afterDismissed().subscribe(() => {
        window.location.reload();
      });

    },err=>{
      console.log(err);
    })
  }

}
