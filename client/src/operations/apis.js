
// const {currentUser} = useSelector((state)=>state.user)
export const AUTH = {
    signup : "/api/auth/signup",
    signin : "/api/auth/signin",
    signupOAuth : "api/auth/signup/outh/google",
    signinOAuth : "api/auth/signin/outh/google",
    findUser : "/api/auth/userId"
}
export const profile = {
    update : '/api/profile/update',
    createListing : '/api/profile/listing/create',
    updateListing : '/api/profile/listing/update',
    getAllListings : '/api/profile/listing/all',
    deleteListings : '/api/profile/listing/delete',
    findListing : '/api/profile/listing/find',
    getListing : 'api/profile/listing/get'
}