// === Inisialisasi Canvas ===
var cnv = document.getElementById("canvas1");
var ctx = cnv.getContext("2d");
var imageDataA = ctx.getImageData(0, 0, cnv.width, cnv.height);
var W = cnv.width, H = cnv.height;
