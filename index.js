const Discord = require("discord.js");
const client = new Discord.Client();
const axios = require('axios');
const cheerio = require('cheerio');
client.on("ready", () => {
  console.log(`Bot has started, with ${client.users.size} users`);
});
client.on('message', msg => {
    if (msg.author.id != client.user.id && msg.content.substring(0,1)=='~') {
    	if(msg.content.indexOf('=')>0){
    	var ctg = msg.content.slice(1,msg.content.indexOf('='));
    	var csp = msg.content.slice(msg.content.indexOf('=')+1,msg.content.length);
    	var link = decodeURI('https://phuongtrinhhoahoc.com/?chat_tham_gia='+ctg+'&chat_san_pham='+csp);
    	var embed = new Discord.MessageEmbed()
    	.setTitle('Chất tham gia: '+ctg.toUpperCase()+'\nChất sản phẩm: '+csp.toUpperCase())
    	.setColor('#FF00F3');
    	push(link);
  		
    	}else{
    		msg.channel.send('Cú pháp đúng là: `~ ChatThamGia = ChatSanPham` ');
    	} 
 	}

	function push(link){
		axios(link)
	     	.then(response => {
	       const html = response.data;
	       const $ = cheerio.load(html);
	       const ptrinh = $('.formula-row');
	       const da = [];
	       const result_count = $('.search_result_count');
	       const countB = $(result_count[0]).find('b');
	       const count = $(countB[0]).text();
	       numC = count.match(/\d/g);
	       numC = numC.join("");
	       ptrinh.each(function() {
	      		 const a = $(this).text();
	      		 da.push('> '+a+'\n');
	       });  
	       embed.setDescription(da);
	       embed.setFooter('Có '+numC+' kết quả');
	      	msg.channel.send(embed);
	   })
	     .catch(console.error); 
	}
});
client.login("NzE4MjE0MDgwMDc0MzUwNjEz.XtlnFw.OvKlbN-6iPKRw2lbvnE5V53BXZg");