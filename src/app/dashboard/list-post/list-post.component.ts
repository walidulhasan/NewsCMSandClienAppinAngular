import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Blog } from 'src/app/models/blog.model';
import { AuthorService } from 'src/app/services/author.service';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit {
  listBlogs : any = [];
  dataSource: MatTableDataSource<Blog> = new MatTableDataSource(this.listBlogs);
  // @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  displayedColumns: string[] = ['newsId', 'ImageName', 'Title', 'Body', 'Author', 'Category', 'Action'];

  durationInSeconds = 5;
  token:any;
  authorDetails:any;

  constructor(private blogService:BlogService,
    private elRef: ElementRef,
    private _snackBar:MatSnackBar,
    private titleservice:Title,
    private authorService:AuthorService) {
      this.titleservice.setTitle("List News");
    }

    openSnackBar(msg:any) {
      this._snackBar.open(msg,"", {
        duration: this.durationInSeconds * 1000,
        data:"Data saved",
      });
    }

  ngOnInit(): void {
    this.GetPosts();
  }

  GetPosts(){
    this.token = localStorage.getItem('Mahmud_auth');
    this.authorService.authorById(JSON.parse(atob(this.token.split('.')[1]))["iss"]).subscribe(a=>{
      this.authorDetails = a;
      if (this.authorDetails.role == "Admin") {
        this.blogService.listBlogsBack().subscribe(data => {
          this.listBlogs = data;
          this.dataSource.data=this.listBlogs;
          this.dataSource.paginator = this.paginator;
        });
      }
      else{
        this.blogService.listBlogsByAutorId(JSON.parse(atob(this.token.split('.')[1]))["iss"]).subscribe(data => {
          this.listBlogs = data;
          this.dataSource.data=this.listBlogs;
          this.dataSource.paginator = this.paginator;
        });
      }
    })

  }
  DeletePost(id:any): void {
    console.log(this.elRef.nativeElement.parentElement);
    if(confirm("Are you sure to delete?")){
      this.blogService.deletePost(id)
      .subscribe(
        response => {
          this.openSnackBar("Data deleted successfully");
          this.GetPosts();
        },
        error => {
          this.openSnackBar("Oops! Somethis went wrong");
        });
    }
  }
    //Tabil Data Filter
    applyFilter($event:any){
      this.dataSource.filter=$event.target.value;
    }
}

