// Alumni data from GeoJSON
const alumniData = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [110.4024, -7.7325]
      },
      "properties": {
        "nama": "Muhammad Aldino Syahputra",
        "instansi": "Ibriq Coffee Roaster",
        "posisi": "Barista & Kitchen",
        "tahun_masuk_umy": 2015,
        "tahun_lulus_umy": 2019,
        "no_wa": "08********00",
        "alamat": "Jl. Delingsari No.56, Patukan, Ambarketawang, Kec. Gamping, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55294"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [134.062, -0.8615]
      },
      "properties": {
        "nama": "RIZKY IRMANSYAH",
        "instansi": "KISEL GRUP",
        "posisi": "Driver",
        "tahun_masuk_umy": 2011,
        "tahun_lulus_umy": 2016,
        "no_wa": "08********56",
        "alamat": "Manokwari"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [104.2436, -3.4633]
      },
      "properties": {
        "nama": "Muhammad Sohe",
        "instansi": "DPUPR Kab Muara Enim",
        "posisi": "Koordinator Skretariat Komisi Irigasi",
        "tahun_masuk_umy": 2011,
        "tahun_lulus_umy": 2015,
        "no_wa": "08********90",
        "alamat": "Islamic Center Muara Enim"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [110.3705, -7.7972]
      },
      "properties": {
        "nama": "Andri Arnando",
        "instansi": "PT. SAYAP MAS UTAMA 1-WINGS GROUP",
        "posisi": "Production Technician",
        "tahun_masuk_umy": 2013,
        "tahun_lulus_umy": 2018,
        "no_wa": "08********64",
        "alamat": "Jl.tipar cakung"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [106.056, -6.0167]
      },
      "properties": {
        "nama": "Naufal Anshari Usman",
        "instansi": "Asahimas Chemical",
        "posisi": "Sr Staff",
        "tahun_masuk_umy": 2014,
        "tahun_lulus_umy": 2018,
        "no_wa": "08********25",
        "alamat": "Jl Raya Anyer KM 121,Cilegon, Banten"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [107.3, -6.319]
      },
      "properties": {
        "nama": "Lucky Andika Putra",
        "instansi": "PT HM Sampoerna",
        "posisi": "Produksi",
        "tahun_masuk_umy": 2018,
        "tahun_lulus_umy": 2021,
        "no_wa": "08*******16",
        "alamat": "Karawang Plant"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [106.63, -6.1781]
      },
      "properties": {
        "nama": "Rahmat Dwijayanto",
        "instansi": "PT. Selamat Sempurna Tbk (ADR Group)",
        "posisi": "Supervisor Maintenance Engineering",
        "tahun_masuk_umy": 2014,
        "tahun_lulus_umy": 2018,
        "no_wa": "08********37",
        "alamat": "Tangerang"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [106.806, -6.5971]
      },
      "properties": {
        "nama": "Fajar Afrianto, S.T.",
        "instansi": "POLRI",
        "posisi": "Kepala Laboratorium Uji Sarana Transportasi",
        "tahun_masuk_umy": 2014,
        "tahun_lulus_umy": 2018,
        "no_wa": "82*******55",
        "alamat": "Puslitbang Polri, Jl. Raya Tonjong desa cimanggis Bojonggede, Bogor Jawa Barat"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [106.8272, -6.1754]
      },
      "properties": {
        "nama": "Fuad Satriyaji",
        "instansi": "PT Radiant Utama Interinsco",
        "posisi": "RBI Engineer",
        "tahun_masuk_umy": 2020,
        "tahun_lulus_umy": 2024,
        "no_wa": "08*******48",
        "alamat": "Jl. Kapten Tendean No. 24, Mampang Prapatan Jakarta 12720; Indonesia"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [112.7521, -7.2575]
      },
      "properties": {
        "nama": "Sidik permana",
        "instansi": "PT AGRINAS PALMA NUSANTARA / PT INDRA KARYA",
        "posisi": "Asisten Ahli Hidromekanikal",
        "tahun_masuk_umy": 2014,
        "tahun_lulus_umy": 2018,
        "no_wa": "08********16",
        "alamat": "PT. Indra Karya Divisi Engineering 1, Jl. Surabaya No.3A, Gading Kasri, Kec. Klojen, Kota Malang, Jawa Timur 65115"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [106.8272, -6.1754]
      },
      "properties": {
        "nama": "Bayu Shafar Nur Rohman",
        "instansi": "Rekayasa Engineering",
        "posisi": "Engineer",
        "tahun_masuk_umy": 2014,
        "tahun_lulus_umy": 2018,
        "no_wa": "08********97",
        "alamat": "PT REKAYASA ENGINEERING, Gedung Graha RE, Jl. Kalibata Timur II No.27, Kalibata, Kec. Pancoran, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12740"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [106.8272, -6.1754]
      },
      "properties": {
        "nama": "Yoga Nagara Dwi R",
        "instansi": "PT BUKIT MAKMUR MANDIRI UTAMA (BUMA)",
        "posisi": "Jr. Specialist Maintenance & Improvement Analityc",
        "tahun_masuk_umy": 2017,
        "tahun_lulus_umy": 2021,
        "no_wa": "08********69",
        "alamat": "South Quarter, Jl. R.A. Kartini No.Kav. 8, Cilandak Bar., Kec. Cilandak, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12430"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [106.63, -6.1781]
      },
      "properties": {
        "nama": "Suyatno",
        "instansi": "BRIN",
        "posisi": "Researcher",
        "tahun_masuk_umy": 2007,
        "tahun_lulus_umy": 2011,
        "no_wa": "08********22",
        "alamat": "Kawasan Puspiptek, Tangerang Selatan"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [106.8272, -6.1754]
      },
      "properties": {
        "nama": "Agung Wiyanto",
        "instansi": "Emaco Global LLC (Lakeland, FL, USA)",
        "posisi": "Regional Sales Manager (Indonesia)",
        "tahun_masuk_umy": 2014,
        "tahun_lulus_umy": 2018,
        "no_wa": "08********87",
        "alamat": "Jl. Kav. Taman Palem No.9, Kebagusan, Ps. Minggu, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12520"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [107.6191, -6.9175]
      },
      "properties": {
        "nama": "Muhamad Marwan Masruri",
        "instansi": "PT Dirgantara Indonesia",
        "posisi": "Flight Control System Engineer",
        "tahun_masuk_umy": 2014,
        "tahun_lulus_umy": 2018,
        "no_wa": "08********79",
        "alamat": "Bandung"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [106.63, -6.1781]
      },
      "properties": {
        "nama": "Mokhamad Maskhun",
        "instansi": "PT. Multi Mortar",
        "posisi": "Manager Operasional",
        "tahun_masuk_umy": 1999,
        "tahun_lulus_umy": 2004,
        "no_wa": "08********25",
        "alamat": "Jl raya serang km 22, desa kawidaran. Kec. Cikupa. Kab. Tangerang. Prov. Banten"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [107.3, -6.319]
      },
      "properties": {
        "nama": "Inang Hiprasetyo Raharjo",
        "instansi": "PT. Unicharm Indonesia Tbk.",
        "posisi": "Teknisi Produksi",
        "tahun_masuk_umy": 2013,
        "tahun_lulus_umy": 2017,
        "no_wa": "08********43",
        "alamat": "KIIC , Karawang, Jawa Barat"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [107.3, -6.319]
      },
      "properties": {
        "nama": "Nuresa Maulana Djaenuddin",
        "instansi": "PT KD Heat Technology Indonesia",
        "posisi": "Leader Engineering",
        "tahun_masuk_umy": 2015,
        "tahun_lulus_umy": 2019,
        "no_wa": "08********96",
        "alamat": "Jl. Surya Nusa No.19-22, Kutanegara, Kec. Ciampel, Karawang, Jawa Barat 41361"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [104.7754, -2.9761]
      },
      "properties": {
        "nama": "Randi Abdian Dasa",
        "instansi": "PT OKI PULP & PAPER MILLS PALEMBANG",
        "posisi": "Health, Safety and Environment",
        "tahun_masuk_umy": 2014,
        "tahun_lulus_umy": 2019,
        "no_wa": "08********80",
        "alamat": "Sungai Baung OKI Palembang"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [116.8279, -1.2635]
      },
      "properties": {
        "nama": "Restu Andri Yanto",
        "instansi": "PT Pertamina (Persero)",
        "posisi": "Staff",
        "tahun_masuk_umy": 2012,
        "tahun_lulus_umy": 2016,
        "no_wa": "08********67",
        "alamat": "Balikpapan"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [101.4478, 0.5071]
      },
      "properties": {
        "nama": "Leonardo Arizona",
        "instansi": "PT. Gita Riau Makmur",
        "posisi": "Counter sparepart",
        "tahun_masuk_umy": 2013,
        "tahun_lulus_umy": 2018,
        "no_wa": "08********11",
        "alamat": "Jl. Kaharudin Nasution. Pekanbaru"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [110.4024, -7.7325]
      },
      "properties": {
        "nama": "Tiyan Prakasa",
        "instansi": "PT AVO Innovation Technology",
        "posisi": "Special Project",
        "tahun_masuk_umy": 2014,
        "tahun_lulus_umy": 2018,
        "no_wa": "08********68",
        "alamat": "Jl Monjali No. 99 Gemawang, Sinduadi, Sleman, DIY"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [107.1711, -6.2678]
      },
      "properties": {
        "nama": "Akhmad sutriawan",
        "instansi": "Indonesia epson industry",
        "posisi": "Staff",
        "tahun_masuk_umy": 2007,
        "tahun_lulus_umy": 2011,
        "no_wa": "08********98",
        "alamat": "Cikarang selatan"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [107.6191, -6.9175]
      },
      "properties": {
        "nama": "DAYAN APRIANSYAH",
        "instansi": "BBPVP Bandung",
        "posisi": "Instruktur",
        "tahun_masuk_umy": 2011,
        "tahun_lulus_umy": 2015,
        "no_wa": "08********13",
        "alamat": "Jl. Gatot Subroto No.170, Gumuruh, Kec. Batununggal, Kota Bandung, Jawa Barat 40275"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [106.806, -6.5971]
      },
      "properties": {
        "nama": "Bagus Triaji",
        "instansi": "PT. Karya Nusa Industri",
        "posisi": "Staff Purchasing",
        "tahun_masuk_umy": 2012,
        "tahun_lulus_umy": 2016,
        "no_wa": "08********81",
        "alamat": "Jl. Green Park Avenue No.6, Cikeas Udik, Kec. Gn. Putri, Kabupaten Bogor, Jawa Barat 16966"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [106.9756, -6.2383]
      },
      "properties": {
        "nama": "Irsyad Muhammad Sobri",
        "instansi": "PT Aneka Mitra Gemilang (WINGS GROUP)",
        "posisi": "Engineering Staff (Pengawas)",
        "tahun_masuk_umy": 2019,
        "tahun_lulus_umy": 2023,
        "no_wa": "08********12",
        "alamat": "PT Aneka Mitra Gemilang, Jalan Kaliabang Bungur, RT.001/RW.024, Pejuang, Bekasi, West Java"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [106.9756, -6.2383]
      },
      "properties": {
        "nama": "Revana Widyargo",
        "instansi": "PT Maxxis Internasional Indonesia",
        "posisi": "Shift Leader",
        "tahun_masuk_umy": 2012,
        "tahun_lulus_umy": 2017,
        "no_wa": "08********83",
        "alamat": "Greenland International Industrial Center (GIIC) Blok CG No.1, Kelurahan, Pasirranji, Kec. Cikarang Pusat, Kabupaten Bekasi, Jawa Barat 17530"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [106.8272, -6.1754]
      },
      "properties": {
        "nama": "Rizky Nanda Parely",
        "instansi": "PT. Timas Suplindo",
        "posisi": "CMMS Engineer",
        "tahun_masuk_umy": 2016,
        "tahun_lulus_umy": 2021,
        "no_wa": "08********12",
        "alamat": "The Plaza Office Tower Lt. 39, Jalan M.H. Thamrin Kav. 28-30, Menteng, RT.9/RW.5, Gondangdia, Kec. Menteng, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10350"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [106.9756, -6.2383]
      },
      "properties": {
        "nama": "Yudha Yanuar Pamungkas",
        "instansi": "PT Mitsubishi Motors Krama Yudha Indonesia",
        "posisi": "Packaging Engineer",
        "tahun_masuk_umy": 2014,
        "tahun_lulus_umy": 2018,
        "no_wa": "08********17",
        "alamat": "Kawasan Greenland International Industrial Center(GIIC), Blok CH No.1 & 2 Kota Deltamas, Desa, Pasirranji, Kec. Cikarang Pusat, Kabupaten Bekasi, Jawa Barat 17530"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [110.4167, -6.9667]
      },
      "properties": {
        "nama": "Sandy Wicaksono",
        "instansi": "Pemerintah Kota Semarang",
        "posisi": "Kepala seksi",
        "tahun_masuk_umy": 2001,
        "tahun_lulus_umy": 2007,
        "no_wa": "08*******20",
        "alamat": "Jl. Pemuda no.148 Semarang"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [106.63, -6.1781]
      },
      "properties": {
        "nama": "Muhammad Baihaqi",
        "instansi": "PT Detech Profesional Indonesia",
        "posisi": "Analys dan Operator Pengujian",
        "tahun_masuk_umy": 2019,
        "tahun_lulus_umy": 2024,
        "no_wa": "08*******08",
        "alamat": "Bizpoint Modern Multi Business, Point 1, Jl. Guangzhou No.10, Sukamulya, Kec. Cikupa, Kabupaten Tangerang, Banten 15710"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [106.8272, -6.1754]
      },
      "properties": {
        "nama": "Lutfi Khoirul Miftakhul Ni'am",
        "instansi": "PT Darma Henwa",
        "posisi": "Analyst Asset Management",
        "tahun_masuk_umy": 2013,
        "tahun_lulus_umy": 2017,
        "no_wa": "08********07",
        "alamat": "Bakrie Tower, Jl. Epicentrum Utama Raya No.2 23rd Floor, RT.2/RW.5, Karet Kuningan, Kecamatan Setiabudi, Jakarta, Daerah Khusus Ibukota Jakarta 12940"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [104.0305, 1.0456]
      },
      "properties": {
        "nama": "Elfan gumilang",
        "instansi": "PT CIBA VISION BATAM",
        "posisi": "Teknisi",
        "tahun_masuk_umy": 2007,
        "tahun_lulus_umy": 2012,
        "no_wa": "08********28",
        "alamat": "BATAM"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [106.9756, -6.2383]
      },
      "properties": {
        "nama": "Ahmad Ghifari Ibnu Siwi",
        "instansi": "Pt. Sejong summit indonesia",
        "posisi": "Section head ppic & production",
        "tahun_masuk_umy": 2013,
        "tahun_lulus_umy": 2018,
        "no_wa": "08********00",
        "alamat": "Kawasan Delta silikon. Cikarang, bekasi"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [106.8272, -6.1754]
      },
      "properties": {
        "nama": "Robby Priyanto",
        "instansi": "PT ALIA DIGITAL PRINTEX",
        "posisi": "STAFF PPIC",
        "tahun_masuk_umy": 2016,
        "tahun_lulus_umy": 2020,
        "no_wa": "08********35",
        "alamat": "Kawasan Pulogadung, Jakarta Timur"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [106.8272, -6.1754]
      },
      "properties": {
        "nama": "Fahmi Haris Nur Fadhillah",
        "instansi": "PT. Rekayasa Industri",
        "posisi": "Junior 3D Engineer",
        "tahun_masuk_umy": 2014,
        "tahun_lulus_umy": 2018,
        "no_wa": "08********89",
        "alamat": "Jl. Kalibata Timur I No.36, Kalibata, Kec. Pancoran, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12740"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [104.0305, 1.0456]
      },
      "properties": {
        "nama": "Roy Yolanda Saputra",
        "instansi": "PT . Batam Aero Technic",
        "posisi": "Staff Technical Record",
        "tahun_masuk_umy": 2014,
        "tahun_lulus_umy": 2018,
        "no_wa": "08********06",
        "alamat": "Kawasan Bandar Udara Hang Nadim Batam"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [106.8272, -6.1754]
      },
      "properties": {
        "nama": "Angga Ardinista",
        "instansi": "Kementerian BUMN RI",
        "posisi": "Analis",
        "tahun_masuk_umy": 2013,
        "tahun_lulus_umy": 2018,
        "no_wa": "08********33",
        "alamat": "Jl. Medan Merdeka Sel. No.13, RT.11/RW.2, Gambir, Kecamatan Gambir, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10110"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [110.3705, -7.7972]
      },
      "properties": {
        "nama": "Hidayatulloh Eko Nugroho",
        "instansi": "PT supratik suryamas",
        "posisi": "Setter mekanik mesin injection",
        "tahun_masuk_umy": 2007,
        "tahun_lulus_umy": 2012,
        "no_wa": "08********58",
        "alamat": "PT Supratik Suryamas, JL. Salak, Desa, Jl. Magelang No.km 12, Durenan, Tridadi, Daerah Istimewa Yogyakarta 55511"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [110.3705, -7.7972]
      },
      "properties": {
        "nama": "Satriawan Dini Hariyanto",
        "instansi": "Universitas AKPRIND Indonesia",
        "posisi": "Dosen",
        "tahun_masuk_umy": 2012,
        "tahun_lulus_umy": 2015,
        "no_wa": "08********04",
        "alamat": "Jl. Kalisahak No.28, Klitren, Kec. Gondokusuman, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55222"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [110.4167, -6.9667]
      },
      "properties": {
        "nama": "Krisna Rinaldi Widiasta",
        "instansi": "PT SANTOS JAYA ABADI",
        "posisi": "SUPERVISOR MAINTENANCE",
        "tahun_masuk_umy": 2014,
        "tahun_lulus_umy": 2019,
        "no_wa": "08********27",
        "alamat": "X9M3+94H, Jl. Kw. Industri Candi Tahap V, Ngaliyan, Kec. Ngaliyan, Kota Semarang, Jawa Tengah 50211"
      }
    }
  ]
};

// Application state
let map;
let markerClusterGroup;
let alumniMarkers = new Map();
let selectedAlumniId = null;
let allAlumni = [];
let filteredAlumni = [];
let searchQuery = '';

// DOM elements
const elements = {
  searchInput: document.getElementById('searchInput'),
  clearSearch: document.getElementById('clearSearch'),
  toggleSidebar: document.getElementById('toggleSidebar'),
  sidebar: document.getElementById('sidebar'),
  alumniList: document.getElementById('alumniList'),
  totalAlumni: document.getElementById('totalAlumni'),
  visibleAlumni: document.getElementById('visibleAlumni'),
  profileModal: document.getElementById('profileModal'),
  profileContent: document.getElementById('profileContent'),
  closeModal: document.getElementById('closeModal'),
  modalBackdrop: document.getElementById('modalBackdrop'),
  resetView: document.getElementById('resetView'),
  loadingOverlay: document.getElementById('loadingOverlay')
};

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
  initializeMap();
  setupEventListeners();
  processAlumniData();
  setTimeout(() => {
    elements.loadingOverlay.classList.add('hidden');
  }, 1500);
});

// Initialize Leaflet map
function initializeMap() {
  map = L.map('map').setView([-2.5, 118], 5); // Centered on Indonesia

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 18
  }).addTo(map);

  // Initialize marker cluster group
  markerClusterGroup = L.markerClusterGroup({
    chunkedLoading: true,
    maxClusterRadius: 50,
    iconCreateFunction: function(cluster) {
      const count = cluster.getChildCount();
      let size = 'small';
      if (count > 10) size = 'large';
      else if (count > 5) size = 'medium';
      
      return L.divIcon({
        html: `<div><span>${count}</span></div>`,
        className: `marker-cluster marker-cluster-${size}`,
        iconSize: L.point(40, 40)
      });
    }
  });

  map.addLayer(markerClusterGroup);

  // Map event listeners
  map.on('moveend', updateVisibleAlumni);
  map.on('zoomend', updateVisibleAlumni);
}

// Setup all event listeners
function setupEventListeners() {
  // Search functionality
  elements.searchInput.addEventListener('input', debounce(handleSearch, 300));
  elements.clearSearch.addEventListener('click', clearSearch);

  // Sidebar toggle for mobile
  elements.toggleSidebar.addEventListener('click', toggleSidebar);

  // Modal controls
  elements.closeModal.addEventListener('click', closeProfileModal);
  elements.modalBackdrop.addEventListener('click', closeProfileModal);

  // Reset map view
  elements.resetView.addEventListener('click', resetMapView);

  // Close modal on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProfileModal();
      closeSidebar();
    }
  });

  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && 
        elements.sidebar.classList.contains('open') &&
        !elements.sidebar.contains(e.target) &&
        !elements.toggleSidebar.contains(e.target)) {
      closeSidebar();
    }
  });
}

// Process alumni data and create markers
function processAlumniData() {
  allAlumni = alumniData.features.map((feature, index) => ({
    id: index,
    name: feature.properties.nama,
    company: feature.properties.instansi,
    position: feature.properties.posisi,
    startYear: feature.properties.tahun_masuk_umy,
    graduationYear: feature.properties.tahun_lulus_umy,
    phone: feature.properties.no_wa,
    address: feature.properties.alamat,
    coordinates: feature.geometry.coordinates
  }));

  // Set filtered alumni to all alumni initially
  filteredAlumni = [...allAlumni];

  createMarkers();
  renderAlumniList();
  updateStats();
}

// Create map markers for alumni
function createMarkers() {
  markerClusterGroup.clearLayers();
  alumniMarkers.clear();

  filteredAlumni.forEach(alumni => {
    const [lng, lat] = alumni.coordinates;
    
    const marker = L.circleMarker([lat, lng], {
      radius: 8,
      fillColor: '#218B8D',
      color: '#ffffff',
      weight: 2,
      opacity: 1,
      fillOpacity: 0.8,
      className: 'custom-marker'
    });

    // Create popup content with proper event handling
    const popupContent = document.createElement('div');
    popupContent.className = 'popup-content';
    popupContent.innerHTML = `
      <div class="popup-name">${alumni.name}</div>
      <div class="popup-company">${alumni.company}</div>
      <div class="popup-position">${alumni.position}</div>
    `;
    
    const viewProfileBtn = document.createElement('button');
    viewProfileBtn.className = 'popup-view-profile';
    viewProfileBtn.textContent = 'View Profile';
    viewProfileBtn.onclick = (e) => {
      e.stopPropagation();
      showAlumniProfile(alumni.id);
    };
    
    popupContent.appendChild(viewProfileBtn);
    marker.bindPopup(popupContent);
    marker.on('click', () => selectAlumni(alumni.id));
    
    alumniMarkers.set(alumni.id, marker);
    markerClusterGroup.addLayer(marker);
  });
}

// Handle search functionality
function handleSearch(e) {
  searchQuery = e.target.value.toLowerCase().trim();
  
  if (searchQuery) {
    elements.clearSearch.classList.remove('hidden');
    filteredAlumni = allAlumni.filter(alumni => 
      alumni.name.toLowerCase().includes(searchQuery) ||
      alumni.company.toLowerCase().includes(searchQuery) ||
      alumni.position.toLowerCase().includes(searchQuery)
    );
  } else {
    elements.clearSearch.classList.add('hidden');
    filteredAlumni = [...allAlumni];
  }

  createMarkers();
  renderAlumniList();
  updateStats();
  clearSelection();
}

// Clear search
function clearSearch() {
  elements.searchInput.value = '';
  searchQuery = '';
  elements.clearSearch.classList.add('hidden');
  filteredAlumni = [...allAlumni];
  createMarkers();
  renderAlumniList();
  updateStats();
  clearSelection();
}

// Clear current selection
function clearSelection() {
  if (selectedAlumniId !== null) {
    const prevCard = document.querySelector(`[data-id="${selectedAlumniId}"]`);
    if (prevCard) prevCard.classList.remove('selected');
    
    const prevMarker = alumniMarkers.get(selectedAlumniId);
    if (prevMarker) {
      prevMarker.setStyle({ fillColor: '#218B8D', radius: 8 });
    }
    selectedAlumniId = null;
  }
}

// Render alumni list in sidebar
function renderAlumniList() {
  if (filteredAlumni.length === 0) {
    elements.alumniList.innerHTML = `
      <div class="no-results">
        <p>No alumni found${searchQuery ? ` for "${searchQuery}"` : ''}.</p>
      </div>
    `;
    return;
  }

  const listHTML = filteredAlumni.map(alumni => `
    <div class="alumni-card" data-id="${alumni.id}" tabindex="0" role="button">
      <div class="alumni-name">${alumni.name}</div>
      <div class="alumni-company">${alumni.company}</div>
      <div class="alumni-position">${alumni.position}</div>
      <div class="alumni-year">Class of ${alumni.graduationYear}</div>
    </div>
  `).join('');

  elements.alumniList.innerHTML = listHTML;

  // Add event listeners to alumni cards
  elements.alumniList.querySelectorAll('.alumni-card').forEach(card => {
    const alumniId = parseInt(card.dataset.id);
    
    card.addEventListener('click', () => selectAlumni(alumniId));
    
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectAlumni(alumniId);
      }
    });
  });
}

// Select alumni and highlight on map
function selectAlumni(id) {
  // Clear previous selection
  clearSelection();

  selectedAlumniId = id;
  
  // Highlight selected alumni
  const card = document.querySelector(`[data-id="${id}"]`);
  if (card) card.classList.add('selected');
  
  const marker = alumniMarkers.get(id);
  if (marker) {
    marker.setStyle({ fillColor: '#E68161', radius: 12 });
    const alumni = filteredAlumni.find(a => a.id === id);
    if (alumni) {
      const [lng, lat] = alumni.coordinates;
      map.setView([lat, lng], Math.max(map.getZoom(), 10));
      marker.openPopup();
    }
  }
}

// Show alumni profile modal
function showAlumniProfile(id) {
  const alumni = allAlumni.find(a => a.id === id) || filteredAlumni.find(a => a.id === id);
  if (!alumni) return;

  const initials = alumni.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  
  const profileHTML = `
    <div class="profile-header">
      <div class="profile-avatar">${initials}</div>
      <div class="profile-name">${alumni.name}</div>
      <div class="profile-company">${alumni.company}</div>
      <div class="profile-position">${alumni.position}</div>
    </div>
    
    <div class="profile-details">
      <div class="detail-group">
        <div class="detail-label">Education</div>
        <div class="detail-value">
          University Muhammadiyah Yogyakarta<br>
          ${alumni.startYear} - ${alumni.graduationYear}
        </div>
      </div>
      
      <div class="detail-group">
        <div class="detail-label">Current Position</div>
        <div class="detail-value">${alumni.position}</div>
      </div>
      
      <div class="detail-group">
        <div class="detail-label">Company</div>
        <div class="detail-value">${alumni.company}</div>
      </div>
      
      <div class="detail-group">
        <div class="detail-label">Location</div>
        <div class="detail-value">${alumni.address}</div>
      </div>
      
      <div class="detail-group">
        <div class="detail-label">Contact</div>
        <div class="detail-value">
          Phone: ${alumni.phone}<br>
          <small style="color: var(--color-text-secondary);">
            * Contact information is redacted for privacy
          </small>
        </div>
      </div>
    </div>
  `;

  elements.profileContent.innerHTML = profileHTML;
  elements.profileModal.classList.remove('hidden');
  elements.profileModal.setAttribute('aria-hidden', 'false');
  
  // Focus management for accessibility
  elements.closeModal.focus();
}

// Close profile modal
function closeProfileModal() {
  elements.profileModal.classList.add('hidden');
  elements.profileModal.setAttribute('aria-hidden', 'true');
}

// Toggle sidebar for mobile
function toggleSidebar() {
  elements.sidebar.classList.toggle('open');
}

// Close sidebar
function closeSidebar() {
  elements.sidebar.classList.remove('open');
}

// Reset map to initial view and clear search
function resetMapView() {
  // Reset map view
  map.setView([-2.5, 118], 5);
  
  // Clear search
  elements.searchInput.value = '';
  searchQuery = '';
  elements.clearSearch.classList.add('hidden');
  
  // Reset to all alumni
  filteredAlumni = [...allAlumni];
  createMarkers();
  renderAlumniList();
  updateStats();
  
  // Clear selection
  clearSelection();
}

// Update visible alumni count based on map bounds
function updateVisibleAlumni() {
  const bounds = map.getBounds();
  let visibleCount = 0;
  
  filteredAlumni.forEach(alumni => {
    const [lng, lat] = alumni.coordinates;
    if (bounds.contains([lat, lng])) {
      visibleCount++;
    }
  });
  
  elements.visibleAlumni.textContent = visibleCount;
}

// Update statistics
function updateStats() {
  elements.totalAlumni.textContent = filteredAlumni.length;
  updateVisibleAlumni();
}

// Utility function for debouncing
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Make functions available globally for onclick handlers (for popup buttons)
window.selectAlumni = selectAlumni;
window.showAlumniProfile = showAlumniProfile;