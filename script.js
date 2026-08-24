console.log("DailyBoard siap dijalankan!");

const app = document.getElementById("app");

//judul
const judul = document.createElement("h2");
judul.textContent = "Selamat datang di DailyBoard!";
judul.id= "welcome";
app.appendChild(judul);

// THEME BUTTON -----------------------------------------------

const themeButton = document.createElement("button");
themeButton.id = "toggle-tema";

const head = document.getElementById("header");
head.appendChild(themeButton);

const toggleTema = document.getElementById("toggle-tema");

toggleTema.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const modeAktif = document.body.classList.contains("dark-mode");

    localStorage.setItem("tema", modeAktif ? "gelap" : "terang");

});

// terapkan tema saat halaman dibuat
window.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("tema") === "gelap") {
        document.body.classList.add("dark-mode");
    }
});

// DASHBOARD -----------

const dashboard = document.createElement("div");
dashboard.className = "dashboard";

const kolomKiri = document.createElement("div");
kolomKiri.className = "kolom-kiri";

const kolomKanan = document.createElement("div");
kolomKanan.className = "kolom-kanan";

dashboard.appendChild(kolomKiri);
dashboard.appendChild(kolomKanan);

app.appendChild(dashboard);


// CUACA -------------------------------------------------

const Cuaca = document.createElement("section");

const kutip = document.createElement("div");
kutip.className = "kutip";
Cuaca.appendChild(kutip);

let kutipan = document.createElement("p");
kutipan.id = "kutipan-harian";
kutip.appendChild(kutipan);

let auth = document.createElement("small");
auth.id = "author";
kutip.appendChild(auth);

async function ambilKutipan() {
    try {
        const res = await fetch("https://dummyjson.com/quotes/random");

        console.log("Response:", res);
        
        const data = await res.json();

        console.log("Data:", data);

        document.getElementById("kutipan-harian").textContent = data.quote;
        document.getElementById("author").textContent = data.author;

    } catch (error) {
        console.error("Gagal mengambil kutipan:", error);
        kutipan.textContent = "Gagal mengambil kutipan. Silakan coba lagi nanti.";
    }
}

kutip.addEventListener("click", function(){
    ambilKutipan();
})

// ----------------------------

const kotac = document.createElement("input");
kotac.className = "inputbox";
kotac.type = "text";
kotac.placeholder = "nama kota...";

const tombolC = document.createElement("button");
tombolC.textContent = "Cari";

tombolC.addEventListener("click", function(){
    const kota = kotac.value.trim();
    
    ambilCuaca(kota);
});

Cuaca.appendChild(kotac);
Cuaca.appendChild(tombolC)

const infoCuaca = document.createElement("div");
infoCuaca.id = "info-cuaca";
Cuaca.appendChild(infoCuaca);

// HATI HATI API KEY, JANGAN SAMPAI TERBONGKAR

async function ambilCuaca(kota) {
    const apiKey = "aa3c344616e87ac3735b8dea7f373873";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${kota}&appid=${apiKey}&units=metric`;

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Kota tidak ditemukan.");
        const data = await res.json();

        document.getElementById("info-cuaca").innerHTML = `
            <p>${data.name}: ${data.main.temp}°C</p>
            <p>${data.weather[0].description}</p>
        `;
    } catch (error) {
        document.getElementById("info-cuaca").textContent = error.message;
    }
}

const widget = document.createElement("section");
widget.id = "status";

async function muatSemuaWidget() {
    document.getElementById("status").textContent = "Memuat data...";

    await Promise.all([ambilKutipan(), ambilCuaca("Bandung")]);

    document.getElementById("status").textContent = "Data berhasil dimuat";
}

window.addEventListener("DOMContentLoaded", muatSemuaWidget);
Cuaca.appendChild(widget);

kolomKiri.appendChild(Cuaca);


// TUGAS -------------------------------------------------

const Tugas = document.createElement("section");
Tugas.className = "TUGAS";

const judulTugas = document.createElement("h3");
judulTugas.textContent = "TUGAS ";
judulTugas.className = "section-title";
Tugas.appendChild(judulTugas);

// pencarian tugas

const cariTugas = document.createElement("input");
cariTugas.type = "text";
cariTugas.id = "cari-tugas";
cariTugas.placeholder = "Cari Tugas";

Tugas.appendChild(cariTugas);

cariTugas.addEventListener("input", (e) => {
    const kataKunci = e.target.value.toLowerCase();

    const hasil = daftarTugas.filter((tugas) =>
        tugas.nama.toLowerCase().includes(kataKunci)
    );

    renderTugas("semua", hasil);
});

// input

const tugas = document.createElement("input"); 
tugas.className = "inputbox";
tugas.type = "text";
tugas.placeholder = "Tambah Tugas";

//tombol
const tombol = document.createElement("button");
tombol.id = "tambah";

tombol.addEventListener("click", function(){
    if (validasiInput(tugas.value)) {
        tambahTugas(tugas.value);
        tugas.value = "";
    }
});

Tugas.appendChild(tugas);
Tugas.appendChild(tombol);

let daftarTugas = [
    { id : 1, nama: "Belajar Javascript", selesai: false},
    { id : 2, nama: "Olahraga Pagi", selesai: false},
];

const list = document.createElement("ul");
list.id = "daftar-tugas";
list.className = "task-list";
Tugas.appendChild(list);

let nextID = 3;

function simpanKeStorage(){
    localStorage.setItem("daftarTugas", JSON.stringify(daftarTugas));
}

function muatDariStorage(){
    const data = localStorage.getItem("daftarTugas");
    daftarTugas = data ? JSON.parse(data) : [];

    if (daftarTugas.length > 0) {
        nextID = Math.max(...daftarTugas.map(tugas => tugas.id)) + 1;
    } else {
        nextID = 1;
    }
}

function tambahTugas(nama){
    daftarTugas.push ( { id: nextID++, nama, selesai: false });
    simpanKeStorage();
    renderTugas();
}

function hapusTugas(id){
    daftarTugas = daftarTugas.filter((t) => t.id !== id);
    simpanKeStorage();
    renderTugas();
}

function toggleSelesai(id){
    daftarTugas = daftarTugas.map((t) => 
        t.id === id ? { ...t, selesai: !t.selesai } : t
    );
    simpanKeStorage();
    renderTugas();
}

const filterSemua = document.createElement("button");
filterSemua.textContent = "Semua";
filterSemua.addEventListener("click", () => renderTugas("semua"));

const filterSelesai = document.createElement("button");
filterSelesai.textContent = "Selesai";
filterSelesai.addEventListener("click", () => renderTugas("selesai"));

const filterBelum = document.createElement("button");
filterBelum.textContent = "Belum Selesai";
filterBelum.addEventListener("click", () => renderTugas("belum"));

Tugas.appendChild(filterSemua);
Tugas.appendChild(filterSelesai);
Tugas.appendChild(filterBelum);

function editTugas(id, namaBaru){
    daftarTugas = daftarTugas.map((t) => 
        t.id === id ? { ...t, nama: namaBaru } : t
    );
    simpanKeStorage();
    renderTugas();
}

// RENDER TUGas

function renderTugas(filter = "semua", data = daftarTugas){
    const list = document.getElementById("daftar-tugas");
    list.innerHTML = "";

    const tugasTersaring = data.filter((t) => {
        if (filter === "selesai") return t.selesai;
        if (filter === "belum") return !t.selesai;
        return true;
    }); 

    tugasTersaring.forEach(tugas => {
        const li = document.createElement("li");
        li.className = "tugas-item";
        li.dataset.id = tugas.id;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = tugas.selesai;

        checkbox.addEventListener("change", () => {
            toggleSelesai(tugas.id);
        });

        const namaTugas = document.createElement("span");
        namaTugas.textContent = tugas.nama;

        if (tugas.selesai) {
            namaTugas.style.textDecoration = "line-through";
        }

        const tombolHapus = document.createElement("button");
        tombolHapus.textContent = "Hapus";

        tombolHapus.addEventListener("click", () => {
            hapusTugas(tugas.id);
        });

        li.addEventListener("dblclick", function(){
            const inputEdit = document.createElement("input");
            inputEdit.type = "text";
            inputEdit.value = tugas.nama;

            li.textContent = "";
            li.appendChild(inputEdit);
            inputEdit.focus();

            inputEdit.addEventListener("keydown", function(event){
                if (event.key === "Enter") {
                    if (validasiInput(inputEdit.value)) {
                        editTugas(tugas.id, inputEdit.value);
                    }
                }
            });
        });

        li.appendChild(checkbox);
        li.appendChild(namaTugas);
        li.appendChild(tombolHapus);
        list.appendChild(li);

    });

    aktifkanDragDrop();

}

kolomKiri.appendChild(Tugas);


muatDariStorage();
renderTugas();

// CATATAN -------------------------------------------------

const Catatan = document.createElement("section");
Catatan.className = "catatanSection";

const judulCatatan = document.createElement("h3");
judulCatatan.textContent = "CATATAN";
judulCatatan.className = "section-title";
Catatan.appendChild(judulCatatan);

let catatan = document.createElement("textarea");
catatan.className = "catatanIn";
catatan.type = "text";
catatan.placeholder = "Tulis catatan...";

const tombolCatatan = document.createElement("button");
tombolCatatan.id = "tambah";

tombolCatatan.addEventListener("click", function(){
    if (validasiInput(catatan.value)) {
        tambahCatatan(catatan.value);
        catatan.value = "";
    }
});

Catatan.appendChild(catatan);
Catatan.appendChild(tombolCatatan);

const listCatatan = document.createElement("div");
listCatatan.id = "daftar-catatan";
Catatan.appendChild(listCatatan);

function simpanCatatanKeStorage(){
    localStorage.setItem("daftarCatatan", JSON.stringify(daftarCatatan));
}

function muatCatatanDariStorage(){
    const dataCatatan = localStorage.getItem("daftarCatatan");
    daftarCatatan = dataCatatan ? JSON.parse(dataCatatan) : [];
}

let daftarCatatan = [];

function tambahCatatan(isi){
    daftarCatatan.push({ id: Date.now(), isi, tanggal: new Date().toLocaleDateString() });
    simpanCatatanKeStorage();
    renderCatatan();
}

function editC(id, isiBaru){
    daftarCatatan = daftarCatatan.map((t) => 
        t.id === id ? {...t, isi : isiBaru} : t
    );
    simpanCatatanKeStorage();
    renderCatatan();
}

function hapusCatatan(id){
    daftarCatatan = daftarCatatan.filter((t) => t.id !== id);
    simpanCatatanKeStorage();
    renderCatatan();
}

function renderCatatan(){
    const container = document.getElementById("daftar-catatan");
    container.innerHTML = "";

    daftarCatatan.forEach(catatan => {
        const div = document.createElement("div");
        div.className = "catatan-item";
        div.innerHTML = `<p>${catatan.isi}</p><small>${catatan.tanggal}</small>`;
        container.appendChild(div);

        div.addEventListener("dblclick", function(){
            const editi = document.createElement("input");
            editi.type = "text";
            editi.value = catatan.isi;

            div.textContent = "";
            div.appendChild(editi);
            editi.focus();

            editi.addEventListener("keydown", function(event){
                if (event.key === "Enter") {
                    if (validasiInput(editi.value)) {
                        editC(catatan.id, editi.value);
                    }
                }
            });
        });

        const tombolHapus = document.createElement("button");
        tombolHapus.textContent = "Hapus";
        tombolHapus.addEventListener("click", () => hapusCatatan(catatan.id));
        
        div.appendChild(tombolHapus);
    });
}

function validasiInput(nilai){
    if (nilai.trim() === "") {
        alert("Input tidak boleh kosong!");
        return false;
    }
    if (nilai.length > 100) {
        alert("Input maksimal 100 Karakter!");
        return false;
    }
    return true;
}

kolomKanan.appendChild(Catatan);

muatCatatanDariStorage();
renderCatatan();

// FITUR LANJUTAN

function aktifkanDragDrop() {
    const list = document.getElementById("daftar-tugas");

    const items = list.querySelectorAll(".tugas-item");

    items.forEach((item) => {
        item.setAttribute("draggable", true);

        item.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", item.dataset.id);
        });
    });

    list.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    list.addEventListener("drop", (e) => {
        e.preventDefault();

        const id = Number(e.dataTransfer.getData("text/plain"));

        const item = list.querySelector(`.tugas-item[data-id="${id}"]`);

        if (!item) return;

        const items = [...list.querySelectorAll(".tugas-item")].filter((i) => i !== item);

        let posisiBaru = items.length;

        for (let i = 0; i < items.length; i++) {
            const posisi = items[i].getBoundingClientRect();
            const tengah = posisi.top + posisi.height / 2;

            if (e.clientY < tengah) {
                posisiBaru = i;
                break;
            }
        }

        if (posisiBaru >= items.length) {
            list.appendChild(item);
        } else {
            list.insertBefore(item, items[posisiBaru]);
        }

        const urutanBaru = [...list.querySelectorAll(".tugas-item")].map((item) => Number(item.dataset.id));

        daftarTugas.sort((a, b) => {
            return urutanBaru.indexOf(a.id) - urutanBaru.indexOf(b.id);
        });

        simpanKeStorage();
    });
}