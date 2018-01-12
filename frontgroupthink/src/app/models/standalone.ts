export class Standalone {

    constructor(
        public _id: string,
        public name: string,
        public text : Array<string>,
        public characters: Array<string>,
        public location : string, //geoJSON
    ){}

    static CreateDefault(): Standalone {
        return new Standalone('', '', [], [], '');
    }
}


@Component({
  selector: 'users',
  templateUrl: './users.component.html',
})
export class UserComponent implements OnInit {

  newUser: User;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.newUser = User.CreateDefault();
  }

  insertUser() {
    this.userService
    .insertNewUser(this.newUser)
    .subscribe(
      data => {
         this.newUser._id = data.id;
         this.users.push(this.newUser);
         this.newUser = User.CreateDefault();

         console.log("Added user.");
      }
    )
  }
