import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { CategoryModel } from 'src/app/models/category-model';
import { AuthorService } from 'src/app/services/author.service';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-commentss',
  templateUrl: './commentss.component.html',
  styleUrls: ['./commentss.component.css']
})
export class CommentssComponent implements OnInit {
  Categories:any = [];
  dataSource: MatTableDataSource<CategoryModel> = new MatTableDataSource(this.Categories);
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  displayedColumns: string[] = ['commentsId', 'author','commentContent','email','commentDate', 'Action'];
  durationInSeconds = 5;
  //todays date
  today:any="";
  token: any;
  authorDetails: any;

  constructor(
    private _snackBar: MatSnackBar,
    private elRef: ElementRef,
    private titleservice:Title,
    private comSer:CommentsService,
    private authorservice:AuthorService
  ) {
    this.titleservice.setTitle("Comment");
  }

  //for Delete
  openSnackBar(msg:any) {
    this._snackBar.open(msg,"", {
      duration: this.durationInSeconds * 1000,
      data:"Data saved",
    });
  }

  ngOnInit(): void {
    this.getU();
    this.getCom();
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
  //delete cat
  DeletePost(id:any): void {
    console.log(this.elRef.nativeElement.parentElement);
    if(confirm("Are you sure to delete?")){
      this.comSer.commentDelete(id)
      .subscribe(
        response => {
          this.openSnackBar("Data deleted successfully");
          this.getCom();
        },
        error => {
          this.openSnackBar("Oops! Somethis went wrong");
        });
    }
  }

  //get all subCategory list
  getCom(){
    this.comSer.listCommentsDesc().subscribe(data => {
      console.log(data);
      this.Categories = data;
      console.log(data);
      this.dataSource.data=this.Categories;
      this.dataSource.paginator = this.paginator;
    });
  }
  //Tabil Data Filter
  applyFilter($event:any){
    this.dataSource.filter=$event.target.value;
    }

}
