module.exports.setFlash = function (req, res, next) {
  // setting flash message in locals of response and we know we access locals in the template or views
  res.locals.flash = {
    success: req.flash("success"),
    error: req.flash("error"),
  };

  next();
};
