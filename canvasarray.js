// === Inisialisasi Canvas ===
var cnv = document.getElementById("canvas1");
var ctx = cnv.getContext("2d");
var imageDataA = ctx.getImageData(0, 0, cnv.width, cnv.height);
var W = cnv.width, H = cnv.height;

// === FUNGSI DASAR ===
function gambar_titik(imageDataA, x, y, r, g, b) {
    var index = 4 * (Math.round(x) + Math.round(y) * W);
    imageDataA.data[index] = r;
    imageDataA.data[index + 1] = g;
    imageDataA.data[index + 2] = b;
    imageDataA.data[index + 3] = 255;
}

function isi_persegi(imageDataA, x, y, w, h, r, g, b) {
    for (var yy = y; yy < y + h; yy++) {
        for (var xx = x; xx < x + w; xx++) {
            gambar_titik(imageDataA, xx, yy, r, g, b);
        }
    }
}

function dda_line(imageDataA, x1, y1, x2, y2, r, g, b) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    if (Math.abs(dx) > Math.abs(dy)) {
        if (x1 > x2) {
            var y = y1;
            for (var x = x1; x > x2; x--) {
                y += dy / Math.abs(dx);
                gambar_titik(imageDataA, x, y, r, g, b);
            }
        } else {
            var y = y1;
            for (var x = x1; x < x2; x++) {
                y += dy / Math.abs(dx);
                gambar_titik(imageDataA, x, y, r, g, b);
            }
        }
    } else {
        if (y1 > y2) {
            var x = x1;
            for (var y = y1; y > y2; y--) {
                x += dx / Math.abs(dy);
                gambar_titik(imageDataA, x, y, r, g, b);
            }
        } else {
            var x = x1;
            for (var y = y1; y < y2; y++) {
                x += dx / Math.abs(dy);
                gambar_titik(imageDataA, x, y, r, g, b);
            }
        }
    }
}

function bersihkan_layar() {
    ctx.clearRect(0, 0, W, H);
    imageDataA = ctx.getImageData(0, 0, W, H);
}

function tampilkan_layar() {
    ctx.putImageData(imageDataA, 0, 0);
}

// === Fungsi Gambar Array di Canvas ===
function gambar_array(low, mid, high, ditemukan) {
    bersihkan_layar();
    isi_persegi(imageDataA, 0, 0, W, H, 7, 18, 40); // background

    var n = arr.length;
    var margin = 40;
    var gap = 10;
    var barW = Math.floor((W - (margin * 2) - (gap * (n - 1))) / n);
    var maxVal = Math.max.apply(null, arr);
    var scale = (H - 80) / (maxVal || 1);

    for (var i = 0; i < n; i++) {
        var x = margin + i * (barW + gap);
        var barH = Math.max(5, Math.floor(arr[i] * scale));
        var y = H - 30 - barH;
        var r = 59, g = 130, b = 246; // biru default

        if (i < low || i > high) { r = 30; g = 41; b = 59; } // area dibuang
        else if (i === mid && ditemukan) { r = 34; g = 197; b = 94; } // hijau
        else if (i === mid) { r = 250; g = 204; b = 21; } // kuning

        for (var t = 0; t < barW; t++) {
            dda_line(imageDataA, x + t, H - 30, x + t, H - 30 - barH, r, g, b);
        }
    }

    tampilkan_layar();
}