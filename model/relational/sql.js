exports.selectNameUser = function (name) {
    return 'SELECT u.id, u.idAccount, u.name, u.password, u.registerDate, u.activityDate, u.login, u.role, e.address AS email FROM auth.User u LEFT OUTER JOIN msg.Email e ON e.idUser=u.id WHERE name = \'' + name + '\';';
};



exports.insertID = function(identification) {
  var sql = "INSERT INTO id.Identification (name) VALUES (\""+identification.name+"\");"+
         "SET @idIdentification = LAST_INSERT_ID(); "
         if(identification.idDonor != undefined) {
           sql+="INSERT INTO id.DonorIdentification(idDonor,idIdentification) VALUES ("+identification.idDonor+",@idIdentification);"
        } else if (identification.idAgent != undefined) {
          sql+="INSERT INTO id.AgentIdentification(idAgent,idIdentification) VALUES ("+identification.idAgent+",@idIdentification);"
        } else if (identification.idConsumer != undefined) {
          sql+="INSERT INTO id.ConsumerIdentification(idConsumer,idIdentification) VALUES ("+identification.idConsumer+",@idIdentification);"
        }
         sql+="COMMIT;"

         return sql;
}

exports.selectID = function(user) {
  var sql = "";
  if(user.idConsumer != null) {
    sql += this.selectConsumerIdentification(user.idConsumer);
  }
  //  else if(user.idDonor != null) {
  //   sql += this.selectDonorID(user.idDonor);
  // } else if(user.idAgent != null) {
  //   sql += this.selectAgentID(user.idAgent);
  // }
  return sql;
}


exports.selectConsumerIdentification = function(idConsumer) {
  return 'SELECT consumerIdentification.idConsumer, identification.id AS idIdentification, identification.name '+
         'FROM id.ConsumerIdentification consumerIdentification '+
         'LEFT OUTER JOIN id.Identification identification ON identification.id = consumerIdentification.idIdentification '+
         'WHERE consumerIdentification.idConsumer ='+idConsumer+';';
}
