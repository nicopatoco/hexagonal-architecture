export class User {
  constructor(
    public id: string,
    public username: string,
    public password: string // In a real application, this should be hashed
  ) {}
}
