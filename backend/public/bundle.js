!function(t){var n={};function e(a){if(n[a])return n[a].exports;var o=n[a]={i:a,l:!1,exports:{}};return t[a].call(o.exports,o,o.exports,e),o.l=!0,o.exports}e.m=t,e.c=n,e.d=function(t,n,a){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:a})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(e.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var o in t)e.d(a,o,function(n){return t[n]}.bind(null,o));return a},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=0)}([function(t,n){var e=[];function a(){for(var t="",n=0;n<e.length;++n)t+='\n\t\t<tr id="'.concat(e[n].name,'">\n\t\t\t<td>').concat(e[n].name,"</td>\n\t\t\t<td>").concat(e[n].lastModified,"</td>\n\t\t\t<td>").concat(e[n].size,'</td>\n\t\t\t<td>\n\t\t\t\t<a href="').concat(e[n].signedUrl,'">\n\t\t\t\t\t<button class="btn btn-success">\n\t\t\t\t  \t\t<i class="fa fa-download"></i> Download\n\t\t\t\t  \t</button>\n\t\t\t\t</a>\n              <button class="btn btn-danger delete" data-name="').concat(e[n].name,'">\n              \t<i class="fa fa-trash"></i> Delete\n              </button>\n\t\t\t</td>\n\t\t</tr>');$("#fileTable tbody").empty().append(t),$(".delete").click((function(){var t;t=$(this).attr("data-name"),$.ajax({url:"./files/"+encodeURIComponent(t),type:"DELETE",success:function(n){for(var o=0;o<e.length;++o)e[o].name===t&&(e.splice(o,1),o=e.length);a()}})}))}function o(){$.ajax({url:"./files",success:function(t){e=t,a()},error:function(t,n,e){console.log(t.responseText)}})}function r(){var t;$("#selectFileBtn").change((function(n){(t=new FormData).append("fileUpload",n.target.files[0])})),$("#uploadBtn").click((function(){!function(t){$.ajax({url:"./files",data:t,processData:!1,contentType:!1,enctype:"multipart/form-data",type:"POST",success:function(t){o()}})}(t)}))}$(document).ready((function(){r(),$.ajax({url:"./users",success:function(t){$("#avatar").attr("src",t.avatar),$("#userName").empty().append(t.displayName)},error:function(t,n,e){console.log(t.responseText)}}),o()}))}]);