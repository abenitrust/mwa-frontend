const production: boolean = false;
const baseApiUrl: string = "http://localhost:5000/api/v1";
const partApiUrl: string = `${baseApiUrl}/parts`;
const userApiUrl: string = `${baseApiUrl}/users`;
const authenticationApiUrl: string = `${baseApiUrl}/authenticate`;
const updatePasswordPath: string = "change-password";


const toastMsg = {
    networkIssues: "Error occurred, try reloading!",
    
    userCreated: "User successfully created!",
    userCantBeCreated: "User can't be created!",
    userUpdated: "User successfully updated!",
    userCantBeUpdated: "User can't be updated!",
    userDeleted: "User successfully deleted",
    userCantBeDeleted: "Error occurred deleting user",
    userPasswordUpdated: "Password successfully updated!",
    userPasswordCantBeUpdated: "Password can't be updated now!",
    passwordsDontMatch: "Password don't match!",
    
    partCreated: "Part successfully created!",
    partCantBeCreated: "Part can't be created!",
    partUpdated: "Part successfully updated!",
    partCantBeUpdated: "Part can't be updated!",
    partDeleted: "Part successfully deleted",
    partCantBeDeleted: "Error occurred deleting part",

}


export const environment = {
    production,
    baseApiUrl,
    partApiUrl,
    userApiUrl,
    authenticationApiUrl,
    updatePasswordPath,
    toastMsg
};

