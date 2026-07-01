function renderNavbar() {

    const navMenu =
        document.getElementById(
            'nav-menus'
        );

    const hash =
        window.location.hash ||
        '#login';

    if (
        hash === '#login'
    ) {

        navMenu.innerHTML = `

            <span class="text-white">

                Guest

            </span>

        `;

        return;
    }

    const token =
        localStorage.getItem(
            'access_token'
        );

    if (token) {

        navMenu.innerHTML = `

        <div class="d-flex
            align-items-center
            gap-3">

            <div class="d-flex
                        align-items-center
                        text-white">

                <i class="bi bi-person-circle
                          fs-4
                          me-2"></i>

                <span class="fw-bold">

                    Citizen

                </span>

            </div>

            <button
                class="btn
                       btn-danger
                       rounded-pill
                       px-4
                       py-2
                       fw-semibold"
                onclick="logout()">

                <i class="bi bi-box-arrow-right me-2"></i>

                Logout

            </button>

        </div>

        `;

    } else {

        navMenu.innerHTML = `

            <span class="text-white">

                Guest

            </span>

        `;
    }
}

function logout() {

    localStorage.removeItem(
        'access_token'
    );

    localStorage.removeItem(
        'refresh_token'
    );

    window.location.hash =
        '#login';

    location.reload();
}

const routes = {

    '#login': `

        <div class="row
                    justify-content-center
                    align-items-center"
             style="min-height: 85vh;">

            <div class="col-11
                        col-md-6
                        col-lg-4">

                <div class="glass-card p-4 border-0"
                
                            p-4
                            border-0">

                    <div class="text-center mb-4">

                        <div class="bg-primary
                                    bg-gradient
                                    rounded-circle
                                    d-inline-flex
                                    align-items-center
                                    justify-content-center"
                             style="
                                width: 80px;
                                height: 80px;
                             ">

                            <i class="bi bi-shield-lock-fill
                                      text-white"
                               style="font-size: 2rem;"></i>

                        </div>

                        <h2 class="fw-bold mt-3">

                            Citizen Login

                        </h2>

                        <p class="text-muted">

                            Smart City Authentication

                        </p>

                    </div>

                    <form id="loginForm">

    <div class="mb-3">

        <label class="form-label">
            Username
        </label>

        <input
            type="text"
            id="loginUsername"
            name="username"
            class="form-control rounded-4 py-2"
            placeholder="Masukkan username"
            required>

    </div>

    <div class="mb-4">

        <label class="form-label">
            Password
        </label>

        <input
            type="password"
            id="loginPassword"
            name="password"
            class="form-control rounded-4 py-2"
            placeholder="Masukkan password"
            required>

    </div>

                        <button type="submit"
                                class="btn
                                       btn-primary
                                       w-100
                                       rounded-4
                                       py-2">

                            <i class="bi bi-box-arrow-in-right
                                      me-2"></i>

                            Masuk

                        </button>

                    </form>

                </div>

            </div>

        </div>
    `,

    '#dashboard': `

<div class="row g-4">

    <div class="col-12">

        <div
            class="glass-card
                   p-4
                   border-0"
            style="
                background:
                linear-gradient(
                    135deg,
                    #2563eb,
                    #3b82f6
                );
                color:white;
            ">

            <div class="d-flex
                        justify-content-between
                        align-items-center
                        flex-wrap
                        gap-3">

                <div>

                    <h3 class="fw-bold mb-2">

                        <i class="bi
                                  bi-buildings-fill
                                  me-2"></i>

                        Dashboard Citizen

                    </h3>

                    <p class="mb-0
                              text-white-50">

                        Smart City Reporting System

                    </p>

                </div>

               <button
    id="btnBukaModal"
    class="btn
           btn-light
           fw-semibold
           shadow-sm"
    data-bs-toggle="modal"
    data-bs-target="#reportModal">

    <i class="bi
              bi-plus-circle-fill
              me-2"></i>

    Tambah Laporan

</button>

            </div>

        </div>

    </div>

    <aside class="col-12 col-lg-3">

        <div class="glass-card
                    p-4
                    h-100">

            <h5 class="fw-bold
                       text-primary
                       mb-3">

                <i class="bi
                          bi-bar-chart-fill
                          me-2"></i>

                Rekap Status

            </h5>

            <div id="summaryStats">

                Loading...

            </div>

        </div>

    </aside>

    <section class="col-12 col-lg-9">

        <div class="glass-card
                    p-4">

            <div class="d-flex
                        align-items-center
                        mb-3">

                <h5 class="fw-bold
                           mb-0">

                    <i class="bi
                              bi-file-earmark-text-fill
                              text-primary
                              me-2"></i>

                    Daftar Laporan

                </h5>

            </div>

           <ul class="nav
           nav-tabs
           mb-4">

    <li class="nav-item">

        <button
            class="nav-link active"
            id="myReportsTab">

            <i class="bi bi-folder-fill me-1"></i>

            Laporan Saya

        </button>

    </li>

    <li class="nav-item">

        <button
            class="nav-link"
            id="tabFeedKota">

            <i class="bi bi-globe-asia-australia me-1"></i>

            Feed Kota

        </button>

    </li>

</ul>

            <div id="listContainer">

                Loading laporan...

            </div>

            <div
                id="paginationContainer"
                class="mt-4">
            </div>

        </div>

    </section>

</div>

<div class="modal fade"
     id="reportModal"
     tabindex="-1">

    <div class="modal-dialog">

        <div class="modal-content
                    border-0
                    shadow-lg">

            <div class="modal-header
                        text-white"
                 style="
                    background:
                    linear-gradient(
                        135deg,
                        #2563eb,
                        #3b82f6
                    );
                 ">

                <h5
    id="reportModalLabel"
    class="modal-title fw-bold">

    <i class="bi
              bi-pencil-square
              me-2"></i>

    Buat Laporan Baru

</h5>

                <button
                    type="button"
                    class="btn-close
                           btn-close-white"
                    data-bs-dismiss="modal">
                </button>

            </div>

            <div class="modal-body">

    <form id="reportForm">

    <div class="mb-3">

        <label class="form-label fw-semibold">
            Judul Laporan
        </label>

        <input
            type="text"
            id="inputTitle"
            class="form-control"
            placeholder="Masukkan judul laporan"
            required>

    </div>

    <div class="mb-3">

        <label class="form-label fw-semibold">
            Kategori
        </label>

        <select
    id="inputCategory"
    class="form-select"
    required>

    <option value="">Pilih Kategori</option>
    <option value="Infrastruktur">Infrastruktur</option>
    <option value="Kebersihan">Kebersihan</option>
    <option value="Keamanan">Keamanan</option>
    <option value="Lingkungan">Lingkungan</option>
    <option value="Lalu Lintas">Lalu Lintas</option>

</select>

    </div>

    <div class="mb-3">

        <label class="form-label fw-semibold">
            Deskripsi
        </label>

        <textarea
            id="inputDescription"
            class="form-control"
            rows="4"
            required></textarea>

    </div>

    <div class="mb-3">

        <label class="form-label fw-semibold">
            Lokasi
        </label>

        <input
            type="text"
            id="inputLocation"
            class="form-control"
            required>

    </div>

</form>


            <div class="modal-footer">

                <button
                    type="button"
                    class="btn
                           btn-secondary"
                    data-bs-dismiss="modal">

                    Tutup

                </button>

               <button
    type="button"
    class="btn
           btn-warning"
    id="btnDraft">

    Simpan Draft

</button>

<button
    type="button"
    class="btn
           btn-primary"
    id="btnSubmit">

    Ajukan

</button>

            </div>

        </div>

    </div>

</div>
`
};

function handleRouting() {

    const hash =
        window.location.hash ||
        '#login';

    renderNavbar();

    if (
        hash === '#dashboard' &&
        !localStorage.getItem(
            'access_token'
        )
    ) {

        window.location.hash =
            '#login';

        return;
    }

    document.getElementById(
        'app-content'
    ).innerHTML =
        routes[hash];

    if (
        hash === '#login'
    ) {

        setupLoginForm();
    }

    if (
        hash === '#dashboard'
    ) {

        loadDashboardData();

        setTimeout(
            setupDashboardEvents,
            100
        );
    }
}

window.addEventListener(
    'hashchange',
    handleRouting
);

window.addEventListener(
    'DOMContentLoaded',
    handleRouting
);