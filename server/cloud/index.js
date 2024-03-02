Parse.Cloud.define('checkIfUserExists', async (request) => {
  const { email } = request.params;
  const user = await new Parse.Query(Parse.User)
    .equalTo('username', email)
    .first({ useMasterKey: true });
  
  return !!user;
});

Parse.Cloud.define('getUserByAuthId', async (request) => {
  const { authId } = request.params;
  const user = await new Parse.Query(Parse.User)
    .equalTo('authId', authId)
    .first({ useMasterKey: true });
  return user;
});
