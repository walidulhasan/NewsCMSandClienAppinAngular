import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Blog } from '../../models/blog.model';
import { Title } from '@angular/platform-browser';
import { BlogService } from 'src/app/services/blog.service';



@Component({
  selector: 'app-blog-lists',
  templateUrl: './blog-lists.component.html',
  styleUrls: ['./blog-lists.component.css']
})
export class BlogListsComponent implements OnInit {
  listBlogs : any = [];
  dataSource: MatTableDataSource<Blog> = new MatTableDataSource(this.listBlogs);
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  displayedColumns: string[] = ['PostsId', 'ImageName', 'Title', 'Body', 'Author', 'Category', 'Action'];


  durationInSeconds = 5;

  constructor(private blogService:BlogService,
    private elRef: ElementRef,
    private _snackBar:MatSnackBar,
    private titleservice:Title){
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
    this.blogService.listBlogs().subscribe(data => {
      this.listBlogs = data;
      this.dataSource.data=this.listBlogs;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(data);
    });
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

}
