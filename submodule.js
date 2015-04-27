var fs = require('fs'),
    exec = require('child_process').exec;

var folder =  "";

exec("find . -name README.md -print -exec grep -o '\[[a-zA-Z0-9./.-]*\](https://github.com/[a-zA-Z0-9.-]*/[a-zA-Z0-9.,-]*)' {} \\;",function(err,list){
	if (err) throw err;
			
	list.split('\n').forEach(function(line){
		if(line[0] == "." ){
								folder = line.replace('README.md','');
		}else if(line[0] == "[" ){


			line = line.split(':');
			var link = line[0].replace('[','').split('](')[0].replace('/','-');						 
			var repo = line[1].replace('//github.com/','').replace(')','');

			if(!fs.existsSync(folder+'.git')){
				console.log('git submodule add https://github.com/'+repo+' "'+folder+link+'"');

				exec('git submodule add https://github.com/'+repo+' "'+folder+link+'"',function(err,list){
							console.log(list);
				});
			}
		

/*exec('rm -rf "'+folder+link+'"',function(err,list){
				console.log(list);
			});
					*/		
		}
	});
});

