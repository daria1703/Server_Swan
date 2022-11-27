const mongoose = require('mongoose');

const UserDetailsSchema = new mongoose.Schema(

{
    first_name: String,
    last_name: String,
    email: String,
    password: String
},
{
    collection: "UserInfo"
}
);

mongoose.model('UserInfo', UserDetailsSchema);