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
