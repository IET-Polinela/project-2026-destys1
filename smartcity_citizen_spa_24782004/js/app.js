let currentTab = 'my_reports';
let currentPage = 1;

async function loadDashboardData(
    tab = 'my_reports',
    page = 1
) {

    currentTab = tab;
    currentPage = page;

    try {

        const response =
            await requestAPI(
                `/api/report/?tab=${tab}&page=${page}`
            );

        const data =
            await response.json();

        console.log(
            'Response Status:',
            response.status
        );

        console.log(
            'Response Data:',
            data
        );

        if (
            response.status !== 200
        ) {

            document
                .getElementById(
                    'report-list'
                )
                .innerHTML = `

                <div class="alert alert-danger">

                    ${data.detail ||
                      'Gagal mengambil data'}

                </div>
            `;

            return;
        }
        
function getStatusStyle(
    status
) {

    switch (status) {

        case 'DRAFT':

            return {
                badge:
                    'bg-warning text-dark',
                bar:
                    '#facc15'
            };

        case 'REPORTED':

            return {
                badge:
                    'bg-secondary',
                bar:
                    '#64748b'
            };

        case 'VERIFIED':

            return {
                badge:
                    'bg-success',
                bar:
                    '#10b981'
            };

        case 'RESOLVED':

            return {
                badge:
                    'bg-primary',
                bar:
                    '#2563eb'
            };

        default:

            return {
                badge:
                    'bg-dark',
                bar:
                    '#475569'
            };
    }
}

        renderList(
            data.results || []
        );

        renderPagination(
            data
        );

        await loadSummaryStats();

    } catch (error) {

        console.error(
            error
        );

        document
            .getElementById(
                'report-list'
            )
            .innerHTML = `

            <div class="alert alert-danger">

                Tidak dapat
                terhubung ke server

            </div>
        `;
    }
}

function renderList(reports) {

    const container =
        document.getElementById(
            'report-list'
        );

    if (!container) return;

    if (reports.length === 0) {

        container.innerHTML = `
            <div class="alert alert-info">
                Belum ada laporan
            </div>
        `;

        return;
    }

    container.innerHTML =
        reports.map(report => {
            if (report.status === 'DRAFT') {

    statusColor =
        'secondary';

    progressWidth =
        '30%';
}

else if (
    report.status === 'REPORTED'
) {

    statusColor =
        'warning';

    progressWidth =
        '60%';
}

else if (
    report.status === 'IN_PROGRESS'
) {

    statusColor =
        'info';

    progressWidth =
        '80%';
}

else if (
    report.status === 'VERIFIED'
) {

    statusColor =
        'primary';

    progressWidth =
        '90%';
}

else if (
    report.status === 'RESOLVED'
) {

    statusColor =
        'success';

    progressWidth =
        '100%';
}

            return `

            <div
                class="
                    card
                    report-card
                    mb-4
                    shadow-sm
                "
                style="
                    border:none;
                    border-radius:20px;
                ">

                <div
    class="
        card-body
        text-center
        py-2
        px-4
    ">

<h4
    class="
        fw-bold
        mb-2
    ">

    ${report.title}

</h4>

${
    currentTab === 'feed'
    ? `
        <p class="text-muted mb-2">
            <i class="bi bi-person-fill"></i>
            ${report.reporter}
        </p>
      `
    : ''
}

<p
    class="
        fs-6
        text-dark
        mb-3
    ">

    ${report.description}

</p>

                    <span
                        class="
                            badge
                            rounded-pill
                            bg-dark
                            px-4
                            py-2
                            mb-3
                        ">

                        ${report.category}

                    </span>

                    <div
    class="
        d-flex
        justify-content-center
        gap-4
        text-muted
        mb-3
    ">

    <span>
        <i class="bi bi-geo-alt-fill"></i>
        ${report.location}
    </span>

    <span>
        <i class="bi bi-clock"></i>
        ${new Date(
            report.created_at
        ).toLocaleDateString()}
    </span>

</div>

                    ${

                        report.status ===
                        'DRAFT'

                        ?

                        `

                        <div
                            class="mb-3">
                        
                        <button
    class="
        btn
        btn-warning
        btn-sm
        rounded-pill
        px-3
    "
    onclick="editDraft(${report.id})">

    <i class="bi bi-pencil-square me-1"></i>

    Edit Draft

</button>

                        </div>

                        `

                        :

                        ''

                    }

                    <div
                        class="
                            progress
                            mt-4
                        "
                        style="
                            height:18px;
                            border-radius:20px;
                        ">

                        <div
                            class="
                                progress-bar
                                bg-${statusColor}
                                fw-bold
                            "
                            style="
                                width:${progressWidth};
                                font-size:14px;
                            ">

                            ${report.status}

                        </div>

                    </div>

                </div>

            </div>

            `;
        }).join('');
}

async function loadSummaryStats() {

    try {

        const response =
            await requestAPI(
                '/api/report/?tab=my_reports&page_size=1000'
            );

        const data =
            await response.json();

        if (
            response.status !== 200
        ) {

            return;
        }

        const reports =
            data.results || [];

        const draft =
            reports.filter(
                r =>
                r.status ===
                'DRAFT'
            ).length;

        const inProgress =
            reports.filter(
            r =>
            r.status ===
            'IN_PROGRESS'
            ).length;

        const reported =
            reports.filter(
                r =>
                r.status ===
                'REPORTED'
            ).length;

        const resolved =
            reports.filter(
                r =>
                r.status ===
                'RESOLVED'
            ).length;
        
        const verified =
            reports.filter(
            r =>
            r.status ===
            'VERIFIED'

    ).length;

        const container =
            document.getElementById(
                'summary-content'
            );

        if (!container) return;

        container.innerHTML = `

<div class="mb-3">

    <div
        class="card border-0 text-white"
        style="background:#6c757d;">

        <div class="card-body py-2">

            <small>DRAFT</small>

            <h4 class="mb-0 fw-bold">
                ${draft}
            </h4>

        </div>

    </div>

</div>

<div class="mb-3">

    <div
        class="card border-0"
        style="
            background:#ffc107;
            color:black;
        ">

        <div class="card-body py-2">

            <small>REPORTED</small>

            <h4 class="mb-0 fw-bold">
                ${reported}
            </h4>

        </div>

    </div>

</div>

<div class="mb-3">

    <div
        class="card border-0 text-white"
        style="background:#0dcaf0;">

        <div class="card-body py-2">

            <small>IN PROGRESS</small>

            <h4 class="mb-0 fw-bold">
                ${inProgress}
            </h4>

        </div>

    </div>

</div>

<div class="mb-3">

    <div
        class="card border-0 text-white"
        style="background:#0d6efd;">

        <div class="card-body py-2">

            <small>VERIFIED</small>

            <h4 class="mb-0 fw-bold">
                ${verified}
            </h4>

        </div>

    </div>

</div>

<div>

    <div
        class="card border-0 text-white"
        style="background:#198754;">

        <div class="card-body py-2">

            <small>RESOLVED</small>

            <h4 class="mb-0 fw-bold">
                ${resolved}
            </h4>

        </div>

    </div>

</div>

`;

    } catch (
        error
    ) {

        console.error(
            error
        );
    }
}

function renderPagination(
    response
) {

    const container =
        document.getElementById(
            'pagination-container'
        );

    if (!container) return;

    let html = '';

    if (
        response.previous
    ) {

        html += `

            <button
                class="
                    btn
                    btn-outline-primary
                    me-2
                "
                onclick="
                    loadDashboardData(
                        '${currentTab}',
                        ${currentPage - 1}
                    )
                ">

                Previous

            </button>
        `;
    }

    if (
        response.next
    ) {

        html += `

            <button
                class="
                    btn
                    btn-outline-primary
                "
                onclick="
                    loadDashboardData(
                        '${currentTab}',
                        ${currentPage + 1}
                    )
                ">

                Next

            </button>
        `;
    }

    container.innerHTML =
        html;
}

let editingReportId =
    null;

async function editDraft(
    id
) {
    alert(
        'Edit Draft ID: ' + id
    );

    try {

        const response =
            await requestAPI(
                `/api/report/${id}/`
            );

        const report =
            await response.json();

        document.getElementById(
            'title'
        ).value =
            report.title;

        document.getElementById(
            'category'
        ).value =
            report.category;

        document.getElementById(
            'description'
        ).value =
            report.description;

        document.getElementById(
            'location'
        ).value =
            report.location;

        editingReportId =
            id;

        const modal =
            new bootstrap.Modal(
                document.getElementById(
                    'reportModal'
                )
            );

        modal.show();

    } catch (
        error
    ) {

        console.error(
            error
        );

        alert(
            'Gagal mengambil data draft'
        );
    }
}

function setupDashboardEvents() {

    const myReportsTab =
        document.getElementById(
            'myReportsTab'
        );

    const feedTab =
        document.getElementById(
            'feedTab'
        );

    if (myReportsTab) {

        myReportsTab.addEventListener(
            'click',
            () => {

                myReportsTab.classList.add(
                    'active'
                );

                feedTab.classList.remove(
                    'active'
                );

                loadDashboardData(
                    'my_reports',
                    1
                );
            }
        );
    }

    if (feedTab) {

        feedTab.addEventListener(
            'click',
            () => {

                feedTab.classList.add(
                    'active'
                );

                myReportsTab.classList.remove(
                    'active'
                );

                loadDashboardData(
                    'feed',
                    1
                );
            }
        );
    }

    const saveDraftBtn =
        document.getElementById(
            'saveDraftBtn'
        );

    if (saveDraftBtn) {

        saveDraftBtn.addEventListener(
            'click',
            () => {

                submitReport(
                    'DRAFT'
                );
            }
        );
    }

    const submitReportBtn =
        document.getElementById(
            'submitReportBtn'
        );

    if (submitReportBtn) {

        submitReportBtn.addEventListener(
            'click',
            () => {

                submitReport(
                    'REPORTED'
                );
            }
        );
    }
}

async function submitReport(
    status
) {

    const title =
        document.getElementById(
            'title'
        ).value;

    const category =
        document.getElementById(
            'category'
        ).value;

    const description =
        document.getElementById(
            'description'
        ).value;

    const location =
        document.getElementById(
            'location'
        ).value;

    if (
        !title ||
        !category ||
        !description ||
        !location
    ) {

        alert(
            'Lengkapi semua data'
        );

        return;
    }

    let endpoint =
        '/api/report/';

    let method =
        'POST';

    if (
        editingReportId !== null
    ) {

        endpoint =
            `/api/report/${editingReportId}/`;

        method =
            'PUT';
    }

    const response =
        await requestAPI(
            endpoint,
            method,
            {
                title,
                category,
                description,
                location,
                status
            }
        );

    console.log(
        'Response Status:',
        response.status
    );

    if (
        response.ok
    ) {

        alert(
            'Laporan berhasil disimpan'
        );

        const modal =
            bootstrap.Modal
            .getInstance(
                document.getElementById(
                    'reportModal'
                )
            );

        modal.hide();

        document.getElementById(
            'report-form'
        ).reset();

        editingReportId =
            null;

        loadDashboardData();

        return;
    }

    const error =
        await response.json();

    console.log(
        'Error:',
        error
    );

    alert(
        'Gagal menyimpan laporan'
    );
}