export class User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassord: string;

    constructor(
        _id: string = "", firstName: string = "",
        lastName: string = "", email: string = "",
        password: string = "", confirmPassord: string = ""
    ) {
        this._id = _id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.confirmPassord = confirmPassord;
    }


    toJSON() {
        return {
            _id : this._id,
            firstName : this.firstName,
            lastName : this.lastName,
            email : this.email,
            password : this.password,
            confirmPassord : this.confirmPassord
        }
    }
}

export class UsersData {
    page: number = 0;
    perPage: number = 0;
    totalCount: number = 0;
    data: User[] = [];
}

