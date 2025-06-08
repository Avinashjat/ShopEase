 const verifyAdmin = (req, res, next) => {
  const { email, role } = req.user || {};
  if (role === 'admin') {
    next();
  } else {
    res.status(403).json({ success: false, message: 'Unauthorized' });
  }
};

export { verifyAdmin };
