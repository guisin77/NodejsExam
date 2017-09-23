//전역변수 출력

console.log('filename:', __filename);
console.log('dirname:'+__dirname);

//colsole 전역객체 사용
console.log('숫자:%d + %d = %d', 277,52,273+52);
console.log('문자열:%s','Hello World ...!','특수기호와 상관없음');
console.log('JSON: %j',  {name: 'yang' });
console.log('JSON: ' +  JSON.stringify({name: 'yang' }));

var obj = {name:'yang'};
obj = JSON.stringify(obj); // obj -> string
obj = JSON.parse(obj);     // string -> obj

console.time('alpha');

var output = 1
for (var i=1;i<=10; i++){
	output*=i;
}

console.log('result;', output);

console.timeEnd('alpha' )


var module = require('./module.js');

console.log('abs(-3) %d', module.abs(-3));
console.log('circleArea( 3) %d', module.circleArea(3));
