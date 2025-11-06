// === FUNGSI DATA ARRAY ===
function buat_array(jumlah) {
    arr = [];
    var uniqueNumbers = new Set();

    while (uniqueNumbers.size < jumlah) {
        uniqueNumbers.add(Math.floor(Math.random() * 100));
    }

    arr = Array.from(uniqueNumbers);
    arr.sort(function (a, b) { return a - b; });

    gambar_array(-1, -1, -1);
    tampilkan_angka();
}
