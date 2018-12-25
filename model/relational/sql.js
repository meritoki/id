exports.selectNameUser = function (name) {
    return 'SELECT u.id, u.idAccount, u.name, u.password, u.registerDate, u.activityDate, u.login, u.role, e.address AS email FROM auth.User u LEFT OUTER JOIN msg.Email e ON e.idUser=u.id WHERE name = \'' + name + '\';';
};
