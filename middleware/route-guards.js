const isLoggedIn = (req, res, next) => {
    if (!req.session.currentUser) {
      return res.redirect("/");
    }
    next();
  };
  
  // if an already logged in user tries to access the login page it
  // redirects the user to the home page
  const isLoggedOut = (req, res, next) => {
    if (req.session.currentUser) {
      return res.redirect("/profile-page");
    }
    next();
  };
  
  // export the functions to make them available to be used wherever we need them
  // (we just need to import them to be able to use them)
  
  module.exports = {
    isLoggedIn,
    isLoggedOut
  };