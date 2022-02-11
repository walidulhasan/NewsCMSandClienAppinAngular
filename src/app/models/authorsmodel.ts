export class Authorsmodel {
  constructor(
    public authorId?: number,
    public name?: string,
    public email?: string,
    public about?:number,
    public password?: string,
    public dob?: string,
  ) { }
}
