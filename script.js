// //Seçilen Fotoğrafı konteynır da göster
// fileToUpload.onchange = evt => {
//     const [file] = fileToUpload.files
//     if (file) {
//         imgContainer.src = URL.createObjectURL(file)
//     }
// }

let resize = $('#upload-demo').croppie({
    enableExif: true,
    enableOrientation: true,
    viewport: { // Default { width: 100, height: 100, type: 'square' }
        width: 200,
        height: 200,
        type: 'square' //square
    },
    boundary: {
        width: 300,
        height: 300
    }
});
$('#image').on('change', function () {
    let reader = new FileReader();
    reader.onload = function (e) {
        resize.croppie('bind',{
            url: e.target.result
        }).then(function(){
            console.log('jQuery Bağlantısı Tamamlandı');
        });
    }
    reader.readAsDataURL(this.files[0]);
});
$('.btn-upload-image').on('click', function (ev) {
    resize.croppie('result', {
        type: 'canvas',
        size: 'viewport'
    }).then(function (img) {
        $.ajax({
            url: "croppie.php",
            type: "POST",
            data: {"image":img},
            success: function (data) {
                html = '<img src="' + img + '" />';
                $("#preview-crop-image").html(html);
            }
        });
    });
});