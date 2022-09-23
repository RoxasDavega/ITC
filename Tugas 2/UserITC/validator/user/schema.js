const Joi = require('joi');

const userCreateSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    fullName: Joi.string().min(2).required(),
    shortName: Joi.string().min(2).required(),
    biodata: Joi.string().required(),
    angkatan: Joi.number().min(4).required(),
    jabatan: Joi.string().required(),
}).unknown();

const userUpdateSchema = Joi.object({
    fullName: Joi.string().min(2).required(),
    shortName: Joi.string().min(2).required(),
    biodata: Joi.string().required(),
    angkatan: Joi.number().min(4).required(),
    jabatan: Joi.string().required(), 
}).unknown();

const userLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

const userRegisterSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    fullName: Joi.string().min(2).required(),
    shortName: Joi.string().min(2).required(),
    biodata: Joi.string().required(),
    angkatan: Joi.number().min(4).required(),
    jabatan: Joi.string().required(),
}); 
module.exports = { userCreateSchema, userUpdateSchema, userLoginSchema, userRegisterSchema };