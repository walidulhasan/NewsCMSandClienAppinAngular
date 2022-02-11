import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.css']
})
export class DeletePostComponent implements OnInit {

  blogId : string = '';
  durationInSeconds = 5;
  constructor(private activatedRoute: ActivatedRoute,
    private blogService:BlogService,
    private _snackBar : MatSnackBar,
    private router:Router) { }

  openSnackBar(msg:string) {
    this._snackBar.open(msg,"", {
      duration: this.durationInSeconds * 1000,
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data=>{
      this.blogId=data.id;
    });
    if(this.blogId){
      this.blogService.deletePost(this.blogId).subscribe(data=>{
        this.openSnackBar("Data deleted successfully");
      },err=>{
        this.openSnackBar("Oops! Somethis wrong "+err);
      })
    }
  }

}
