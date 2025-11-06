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

function tampilkan_angka() {
    var div = document.getElementById("numbers");
    div.innerHTML = "";
    for (var i = 0; i < arr.length; i++) {
        var span = document.createElement("span");
        span.textContent = arr[i];
        div.appendChild(span);
    }
}

// === Binary Search dengan Animasi ===
function binary_search_visual(target) {
    if (sedang_berjalan) return;
    sedang_berjalan = true;

    var low = 0;
    var high = arr.length - 1;
    var langkah = 0;
    var ditemukan = false;

    var interval = setInterval(function () {
        if (low > high || ditemukan) {
            clearInterval(interval);
            sedang_berjalan = false;
            if (!ditemukan)
                document.getElementById("status").textContent = " Angka " + target + " tidak ditemukan.";
            return;
        }

        var mid = Math.floor((low + high) / 2);
        gambar_array(low, mid, high, false);
        langkah++;
        document.getElementById("status").textContent =
            "Langkah " + langkah + ": cek indeks " + mid + " (nilai " + arr[mid] + ")";

        if (arr[mid] === target) {
            ditemukan = true;
            gambar_array(low, mid, high, true);
            document.getElementById("status").textContent =
                "Ditemukan " + target + " di indeks " + mid + " (langkah " + langkah + ")";
        } else if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }, delay);
}

// === EVENT ===
document.getElementById("mulai").addEventListener("click", function () {
    if (sedang_berjalan) return;
    var target = parseInt(document.getElementById("target").value);
    if (isNaN(target)) {
        document.getElementById("status").textContent = "Masukkan angka target yang valid.";
        return;
    }

    document.getElementById("status").textContent = "Mencari " + target + "...";
    binary_search_visual(target);
});

document.getElementById("acak").addEventListener("click", function () {
    if (sedang_berjalan) return;
    buat_array(15);
    document.getElementById("status").textContent = "Array diacak ulang.";
});

// === Jalankan Awal ===
buat_array(15);
