const db = require('./lowdb')
var bcrypt = require('bcrypt');
var nanoid = require('nanoid');
module.exports =(app)=>{
var passport = require('passport')
   ,LocalStrategy = require('passport-local').Strategy
   ,GoogleStrategy = require('passport-google-oauth').OAuth2Strategy  
   ,KakaoStrategy = require('passport-kakao').Strategy;

  app.use(passport.initialize()); //passport 초기화
  app.use(passport.session());
  //session사용을 위한 serialize(로그인 성공시 session-store에 저장)
  passport.serializeUser(function(user, done) {
    console.log('seriallizeUser', user)
    done(null, user.id); //done 함수의 매개변수에 식별자
  });
  //page를 호출할때마다 같이 호출되는 callback 함수(페이지 방문시 마다 인증된 사용자인지 확인)
  passport.deserializeUser(function(id, done) {   
    var user = db.get('users').find({id:id}).value();    
    console.log('deseriallizeUser', id, user)
    done(null,user)//원래는 사용자 정보를 조회해야한다.
  });
  //인증 성공 유무를 확인
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
    function(email, password, done) {   
      console.log('LocalStrategy', email, password);
      var user = db.get('users').find({email:email}).value(); 
      if(user){
        if(bcrypt.compareSync(password,user.password)){
          return done(null, user,{
            message: "Login success."
            });
        }else{
          return done(null,false,{
            message : 'Incorrect password.'
          });
        }

      }
      else{
        return done(null,false,{
          message : 'There is no email.'
        });
      } 
    }
  ));
  var googleCredentials = require('../config/google.json');
  //console.log(googleCredentials.web.client_id);
  passport.use(new GoogleStrategy({    
    clientID: googleCredentials.web.client_id,
    clientSecret: googleCredentials.web.client_secret,
    callbackURL: googleCredentials.web.redirect_uris[0]
  },
  function(accessToken, refreshToken, profile, done) {
    //console.log('GoogleStrategy', accessToken,refreshToken,profile);
    var email = profile.emails[0].value;
    var user = db.get('users').find({email:email}).value();
    if(user){
      user.googleId = profile.id;
      db.get('users').find({id:user.id}).assign(user).write();
    }else{
      user = {
        id: nanoid.nanoid(),
        email: email,
        displayName : profile.displayName,
        googleId : profile.id
      }
      db.get('users').push(user).write();
    }
    
    done(null, user);
      //  User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //    return done(err, user);
      //  });
  }
));
// var facebookCredentials = require('../config/facebook.json')
// facebookCredentials.procileFields =['id', 'emails', 'name','displayName'];
// passport.use(new FacebookStrategy(facebookCredentials,
// function(accessToken, refreshToken, profile, done) {
//   var email = profile.emails[0].value;
//   var user = db.get('users').find({email:email}).value();
//   if(user){
//     user.facebookId=profile.id;
//     db.get('users').find({email:email}).assign(user).write();
//   }else{
//     user = {
//       id: nanoid.nanoid(),
//       email: email,
//       displayName : profile.displayName,
//       facebookId : profile.id
//     }
//     db.get('users').push(user).write();
//   }
//   done(null,user);
// }
// ));

const kakaoCredentials = require('../config/kakao.json')

passport.use(new KakaoStrategy(kakaoCredentials,
(accessToken, refreshToken, profile, done) => {
  //console.log('kakaoCredentials', profile); 
  var email =  profile._json.kakao_account.email 
  var user = db.get('users').find({email:email}).value();
  if(user){
    user.kakaoId=profile.id;
    db.get('users').find({email:email}).assign(user).write();
  }else{
    user = {
      id: nanoid.nanoid(),
      email: email,
      displayName : profile.displayName,
      kakaoId : profile.id
    }
    db.get('users').push(user).write();
  }
  done(null,user);
}
))
   return passport;
 }