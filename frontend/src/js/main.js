import '../css/normalize.css';
import '../css/styles.scss';

console.log('Hello World');

	function loadUserData() {
      $.ajax({
        url: "./users", success: function(result) {
          $('#avatar').attr('src', result['avatar']);
          $('#userName').empty().append(result['displayName']);
        }, error: function(jqXHR, status, error) { 
          console.log(jqXHR.responseText);
        }
      });
	}

	function loadTableItens() {

	}

$(document).ready(
	() => {
		loadUserData();
		loadTableItens();
	}
);



      // $(function () {

      // var form;
      // $('#fileUpload').change(function (event) {
      //     form = new FormData();
      //     form.append('fileUpload', event.target.files[0]); // para apenas 1 arquivo
      //     //var name = event.target.files[0].content.name; // para capturar o nome do arquivo com sua extenção
      // });

      // $('#btnEnviar').click(function () {
      //         $.ajax({
      //             url: './files',
      //             data: form,
      //             processData: false,
      //             contentType: false,
      //             enctype: "multipart/form-data",
      //             type: 'POST',
      //             success: function (data) {
      //                 console.log(data);
      //             }
      //         });
      //     });
      // });

      // var x = [];
      // $.ajax({
      //   url: "./files", success: function(result) {
      //     console.log(result);
      //     x = result;
      //     deletar();
      //   }, error: function(a, b, c) { 
      //     console.log(a.responseText);
      //   }
      // })

      // function deletar() {
      //         $.ajax({
      //             url: './files/' + encodeURIComponent(x[1]['Key']),
      //             type: 'DELETE',
      //             success: function (data) {
      //                 console.log(data);
      //             }
      //         });
      // }