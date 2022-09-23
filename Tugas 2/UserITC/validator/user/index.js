const { userCreateSchema, userUpdateSchema, userLoginSchema, userRegisterSchema } = require("./schema");

function validateUserCreatePayload(payload) {
    const validateResult = userCreateSchema.validate(payload);
    if (validateResult.error) {
        throw new Error(validateResult.error.message);
    }
}

function validateUserUpdatePayload(payload) { 
    const validateResult = userUpdateSchema.validate(payload);
    if (validateResult.error) {
        throw new Error(validateResult.error.message);
    }
}

function validateUserLoginPayload(payload) {
    const validateResult = userLoginSchema.validate(payload);
    console.log(payload);
    if (validateResult.error) {
        throw new Error(validateResult.error.message);
    }
}

function validateUserRegisterPayload(payload) {
    const validateResult = userRegisterSchema.validate(payload);
    if (validateResult.error) {
        throw new Error(validateResult.error.message);
    }
}

module.exports = { validateUserCreatePayload, validateUserUpdatePayload, validateUserLoginPayload, validateUserRegisterPayload };