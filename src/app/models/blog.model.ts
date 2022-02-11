export class Blog {
    constructor(
        public postsId?: number,
        public imageName?: string,
        public title?: string,
        public views?:number,
        public body?: string,
        public author?: string,
        public category?: string,
      ) { }
}
