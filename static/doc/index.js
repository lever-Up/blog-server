// tpl模板编译
function template (data, tplStr, opt) {
    opt = opt || {};
    var obj = opt.name || 'obj';
    var tpl = tplStr;
    var source = "var __t='';__t+='";
    var index = 0;

    tpl = tpl.replace(/\r|\n|\u2028|\u2029/g, '');
    tpl.replace(/<%=([\s\S]+?)%>|<%-([\s\S]+?)%>|<%([\s\S]+?)%>/g, function(match, str, escape, jsCode, offset){
        source += tpl.slice(index, offset).replace(/'/g, '\\\'');
        index = offset + match.length;

        if(str){
            source += "';\n__t+=" + str + ";\n__t+='";
        }else if(escape){
            source += "';\n__t+=(";
            source += escape;
            source += " || '').replace(/(<)|(>)/g, function(match, $1, $2){if($1){return '&lt;'}else if($2){return '&gt;'}});\n__t+='";
        }else if(jsCode){
            source += "';\n" + jsCode + "\n__t+='";
        }
    });
    source += "';__t+='" + tpl.slice(index).replace(/'/g, '\\\'') + "';";
    source += 'return __t;';
    var func = new Function(obj, source);
    return func.call(null, data);
}

(function(){

    var $app = $('#app'), $itemTpl = $('#itemTpl');

    for(var i=0; i<interfaceData.length; i++) {
        $app.append(template(interfaceData[i], $itemTpl.html()))
    }

    $app.on('click', '.interface_path', function(){
        if( $(this).hasClass('active') ) {
            $(this).removeClass('active');
            $(this).parent().find('.interface_info').hide();
        }else{
            $(this).addClass('active');
            $(this).parent().find('.interface_info').show();
            $(this).parent().siblings().find('.interface_info').hide()
        }
    })

})();