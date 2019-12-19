import '../css/normalize.css';
import '../css/styles.scss';

let fileList = [];
let table;

function drawTable() {
	let rows = '';
	for (let i = 0; i < fileList.length; ++i) {
		rows += `
		<tr id=\"${fileList[i]['name']}\">
			<td>${fileList[i]['name']}</td>
			<td>${fileList[i]['lastModified']}</td>
			<td>${fileList[i]['size']}</td>
			<td>
				<a href=\"${fileList[i]['signedUrl']}\">
					<button class=\"btn btn-success\">
				  		<i class=\"fa fa-download\"></i> Download
				  	</button>
				</a>
              <button class=\"btn btn-danger delete\" onclick=\"deleteFile(\'${fileList[i]['name']}\')\">
              	<i class="fa fa-trash"></i> Delete
              </button>
			</td>
		</tr>`;
	}
	$('#fileTable tbody').empty().append(rows);
}

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
	$.ajax({
    	url: "./files", success: function(result) {
          fileList = result;
          drawTable();
        }, error: function(jqXHR, status, error) { 
          console.log(jqXHR.responseText);
        }
    });
}

function deleteFile(fileName) {
	$.ajax({
    	url: './files/' + encodeURIComponent(fileName),
        type: 'DELETE',
        success: function (data) {
        	//TODO apagar da tabela
        }
    });
}

$(".delete").click(function() {
	deleteFile($(this).attr('data-name'));
});

$("uploadBtn").click(function() {
	deleteFile($(this).attr('data-name'));
});

$(document).ready(
	() => {
		// table = $('#fileTable').DataTable();
		loadUserData();
		// loadTableItens();
		fileList = [
			{
		      "name": 'arq1',
		      "lastModified": '01/02/1989',
		      "size": '2GB',
		      "signedUrl": 'www.google.com'
		    },
		    {
		      "name": 'arq2',
		      "lastModified": '03/02/1989',
		      "size": '3GB',
		      "signedUrl": 'www.google.com'
		    }
		];
        drawTable();
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