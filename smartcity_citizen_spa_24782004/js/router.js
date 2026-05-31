function renderNavbar() {

    const navMenu =
        document.getElementById(
            'nav-menu'
        );

    const token =
        localStorage.getItem(
            'access_token'
        );

    if (token) {

        navMenu.innerHTML = `

            <div class="d-flex
                        align-items-center
                        gap-2">

                <div class="d-flex
                            align-items-center
                            text-white
                            small">

                    <i class="bi bi-person-circle
                              me-1"></i>

                    <span class="fw-semibold">

                        Citizen

                    </span>

                </div>

                <button class="btn
                               btn-danger
                               btn-sm
                               rounded-pill"
                        onclick="logout()">

                    <i class="bi bi-box-arrow-right"></i>

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

                <div class="glass-card
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

                    <form id="login-form">

                        <div class="mb-3">

                            <label class="form-label">

                                Username

                            </label>

                            <input type="text"
                                   id="loginUsername"
                                   class="form-control
                                          rounded-4
                                          py-2"
                                   placeholder="Masukkan username"
                                   required>

                        </div>

                        <div class="mb-4">

                            <label class="form-label">

                                Password

                            </label>

                            <input type="password"
                                   id="loginPassword"
                                   class="form-control
                                          rounded-4
                                          py-2"
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

            <aside class="col-12 col-lg-3">

                <div class="glass-card
                            p-4
                            text-center
                            h-100">

                    <div class="bg-primary
                                bg-gradient
                                rounded-circle
                                d-inline-flex
                                align-items-center
                                justify-content-center
                                mb-3"
                         style="
                            width: 60px;
                            height: 60px;
                         ">

                        <i class="bi bi-person-fill
                                  text-white"
                           style="font-size: 1.5rem;"></i>

                    </div>

                    <h5 class="fw-bold">

                        Profil Citizen

                    </h5>

                    <p class="text-muted small">

                        Akses informasi akun warga

                    </p>

                </div>

            </aside>

            <section class="col-12 col-lg-6">

                <div class="glass-card
                            p-4
                            h-100
                            text-white"
                     style="
                        background:
                        linear-gradient(
                            135deg,
                            #2563eb,
                            #3b82f6
                        );
                     ">

                    <h2 class="fw-bold">

                        Dashboard Warga

                    </h2>

                    <p class="mt-3">

                        Selamat datang di Smart City
                        Portal. Laporkan masalah kota
                        dengan cepat dan mudah.

                    </p>

                    <div class="row mt-3 g-3">

                        <div class="col-6">

                            <div class="bg-white
                                        text-dark
                                        rounded-4
                                        p-3
                                        shadow-sm">

                                <h4 class="fw-bold mb-1">

                                    24

                                </h4>

                                <small>

                                    Laporan Masuk

                                </small>

                            </div>

                        </div>

                        <div class="col-6">

                            <div class="bg-white
                                        text-dark
                                        rounded-4
                                        p-3
                                        shadow-sm">

                                <h4 class="fw-bold mb-1">

                                    12

                                </h4>

                                <small>

                                    Diproses

                                </small>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            <aside class="col-12 col-lg-3">

                <div class="glass-card
                            p-4
                            text-center
                            h-100">

                    <div class="bg-primary
                                bg-gradient
                                rounded-circle
                                d-inline-flex
                                align-items-center
                                justify-content-center
                                mb-3"
                         style="
                            width: 60px;
                            height: 60px;
                         ">

                        <i class="bi bi-megaphone-fill
                                  text-white"
                           style="font-size: 1.5rem;"></i>

                    </div>

                    <h5 class="fw-bold">

                        Pengumuman

                    </h5>

                    <p class="text-muted small">

                        Informasi terbaru Smart City

                    </p>

                </div>

            </aside>

        </div>
    `
};

function handleRouting() {

    renderNavbar();

    const hash =
        window.location.hash ||
        '#login';

    document.getElementById(
        'app-content'
    ).innerHTML =
        routes[hash];

    if (hash === '#login') {

        setupLoginForm();
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