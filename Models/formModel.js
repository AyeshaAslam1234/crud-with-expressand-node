const mongoosee = require('mongoosee');
const slugify = require('slugify');

const DataSchema = new mongoosee.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    CreateDate:{
        type:Date,
        default : Date.now()
    },
    slug:{
        type:String,
        required : true,
        unique: true
    }
})


DataSchema.pre('validate',function(next){
    if(this.fname){
        this.slug = slugify(this.fname,{lower:true,strict:true})
    }
    next()
})


module.exports = mongoosee.model("Data",DataSchema)