
// const {currentUser} = useSelector((state)=>state.user)
export const AUTH = {
    signup : "/api/auth/signup",
    signin : "/api/auth/signin",
    signupOAuth : "api/auth/signup/outh/google",
    signinOAuth : "api/auth/signin/outh/google"
}
export const profile = {
    update : '/api/profile/update',
    createListing : '/api/profile/listing/create',
    updateListing : '/api/profile/listing/update'
}