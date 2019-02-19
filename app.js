var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var bodyParser = require('body-parser');
var flag = 1;
var pen = 0,
    centPen = 0;
var apple = 0,
    centApple = 0;
var date = new Date();
var duedate = new Date();


//var centi = [{name:'user1',password:1},{name:'user2',password:2}];
//var ejs=require('ejs');

//debug test
/*
setTimeout(() => {
  debugger;
  console.log('world');
}, 1000);
console.log('hello');
*/
//set due date
duedate.setDate(50);

app.use(bodyParser());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
 
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '/html/index.html'));
  
});

app.get('/result', function(req, res){
  res.render(__dirname + "/html/result.html",{pen:pen,apple:apple,centApple:centApple,centPen:centPen});
  
});

app.get("/vote",function(req,res){
  res.sendFile(__dirname + "/html/vote.html");
})
app.get("/error",function(req,res){
  res.sendFile(__dirname + '/html/index.html');
})
app.get("/about",function(req,res){
  res.sendFile(__dirname + '/html/about.html');
})



app.post('/', function(req, res){
  var userName = req.body.userName;
  console.log("usrname");
  console.log(userName);
  console.log("today's date");
  console.log(date.getDate());
  console.log(duedate.getDate());
  if(date.getDate()<duedate.getDate()){
        var html = 'Hello: ' + userName + '.<br>' +
            '<a href="/vote">Continue.</a>';
        res.send(html);
        flag = 0;
  }
  else{
    console.log('duedate');   
    var html = 'Hello: ' + userName + '.<br>' +'Due date is reached'+
            '<a href="/result">See result.</a>';
        res.send(html);
        flag = 0;
  }
  if(flag == 1){
     var html = 'error'+ '.<br>' +
             '<a href="/">Try again.</a>';
          res.send(html);
  }
  
});   

 
io.on('connection', function(socket){
  console.log('a user connected');
  
  socket.on('message', function (msg) {
      var choice = msg;
      if(choice == 1){
        pen++;
        centPen = pen*100/(pen + apple);
        centApple = apple*100/(pen + apple);
        var list =[1,centPen,centApple];
        console.log('pen: ' + pen);
        socket.emit('message',list);
        socket.broadcast.emit('message',list);
      }
      else if(choice == 2){
        apple++;
        centPen = pen*100/(pen + apple);
        centApple = apple*100/(pen + apple);
        var list =[1,centPen,centApple];
        console.log('apple: ' + apple);
        //socket.emit('message',list);
        io.emit('message',list);
      }
     
});
  
 
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  setInterval(function(){
    socket.emit('refresh','1s');
  },1000)
    
 

 
});

//app.set('port', process.env.PORT || 3000);

//warning app.listen()will not work here
var server = http.listen(3000, function() {
        
  console.log('start at port:' + server.address().port);
});