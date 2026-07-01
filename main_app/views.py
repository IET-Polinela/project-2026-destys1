from django.shortcuts import get_object_or_404, redirect, render
from django.http import HttpResponse, Http404
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from django.views import View
from django.urls import reverse_lazy
from django.contrib import messages
from django.http import JsonResponse
from django.db.models import Q

from .models import Report


def home(request):
    return render(request, 'main_app/home.html')


def welcome(request):
    return HttpResponse("Selamat Datang")


# MIXIN KHUSUS ADMIN
class AdminRequiredMixin:
    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            messages.error(request, "Silakan login terlebih dahulu.")
            return redirect('login')

        if not request.user.is_admin:
            messages.error(request, "Akses Ditolak: hanya admin yang dapat mengakses fitur ini.")
            return redirect('report_list')

        return super().dispatch(request, *args, **kwargs)


# LIST VIEW - boleh diakses semua user
class ReportListView(AdminRequiredMixin, ListView):
    model = Report
    template_name = (
        'main_app/report_list.html'
    )

    context_object_name = (
        'reports'
    )

    def get_queryset(self):

        return (
            Report.objects
            .exclude(
                status='DRAFT'
            )
            .order_by(
                '-created_at'
            )
        )


# DETAIL VIEW - boleh diakses semua user
class ReportDetailView(AdminRequiredMixin, DetailView):
    model = Report
    template_name = 'main_app/report_detail.html'
    context_object_name = 'report'


# CREATE VIEW - hanya admin
class ReportCreateView(AdminRequiredMixin, CreateView):
    model = Report
    fields = ['title', 'category', 'description', 'location']
    template_name = 'main_app/add_report.html'
    success_url = reverse_lazy('report_list')

    def get_form(self, form_class=None):
        form = super().get_form(form_class)
        form.fields['title'].widget.attrs.update({
            'class': 'form-control',
            'placeholder': 'Masukkan judul laporan'
        })
        form.fields['category'].widget.attrs.update({
            'class': 'form-select'
        })
        form.fields['description'].widget.attrs.update({
            'class': 'form-control',
            'placeholder': 'Masukkan deskripsi laporan',
            'rows': 4
        })
        form.fields['location'].widget.attrs.update({
            'class': 'form-control',
            'placeholder': 'Masukkan lokasi kejadian'
        })
        return form

    def form_valid(self, form):
        messages.success(self.request, "Laporan berhasil ditambahkan")
        return super().form_valid(form)


# UPDATE VIEW - hanya admin
class ReportUpdateView(AdminRequiredMixin, UpdateView):
    model = Report
    fields = ['title', 'category', 'description', 'location']
    template_name = 'main_app/update_report.html'
    success_url = reverse_lazy('report_list')

    def get_form(self, form_class=None):
        form = super().get_form(form_class)
        form.fields['title'].widget.attrs.update({
            'class': 'form-control',
            'placeholder': 'Masukkan judul laporan'
        })
        form.fields['category'].widget.attrs.update({
            'class': 'form-select'
        })
        form.fields['description'].widget.attrs.update({
            'class': 'form-control',
            'placeholder': 'Masukkan deskripsi laporan',
            'rows': 4
        })
        form.fields['location'].widget.attrs.update({
            'class': 'form-control',
            'placeholder': 'Masukkan lokasi kejadian'
        })
        return form

    def form_valid(self, form):
        messages.success(self.request, "Laporan berhasil diperbarui")
        return super().form_valid(form)


# DELETE VIEW - hanya admin
class ReportDeleteView(AdminRequiredMixin, DeleteView):
    model = Report
    template_name = 'main_app/delete_report.html'
    success_url = reverse_lazy('report_list')

    def form_valid(self, form):
        messages.success(self.request, "Laporan berhasil dihapus")
        return super().form_valid(form)


# UPDATE STATUS - hanya admin
class ReportUpdateStatusView(AdminRequiredMixin, View):
    def post(self, request, pk):
        report = get_object_or_404(Report, pk=pk)
        new_status = request.POST.get('status')

        if report.status == 'REPORTED' and new_status == 'VERIFIED':
            report.status = 'VERIFIED'
        elif report.status == 'VERIFIED' and new_status == 'IN_PROGRESS':
            report.status = 'IN_PROGRESS'
        elif report.status == 'IN_PROGRESS' and new_status == 'RESOLVED':
            report.status = 'RESOLVED'
        else:
            messages.error(request, "Perubahan status tidak valid")
            return redirect('report_list')

        report.save()
        messages.success(request, "Status berhasil diperbarui")
        return redirect('report_list')

class ReportLiveSearchView(View):
    def get(self, request, *args, **kwargs):

        if (
            not request.user.is_authenticated
            or not request.user.is_admin
        ):
            return JsonResponse(
                {
                    'detail': 'Forbidden'
                },
                status=403
            )

        query = request.GET.get('q', '').strip()

        reports = Report.objects.all()

        if query:
            reports = reports.filter(
                Q(title__icontains=query) |
                Q(category__icontains=query) |
                Q(location__icontains=query) |
                Q(status__icontains=query)
            )

        data = list(
            reports.order_by('-created_at').values(
                'id',
                'title',
                'category',
                'location',
                'status'
            )
        )[:20]

        return JsonResponse({
            'reports': data,
            'results': data,
        })


class ReportDetailJsonView(View):
    def get(self, request, pk, *args, **kwargs):
        report = get_object_or_404(Report, pk=pk)

        return JsonResponse({
            'id': report.id,
            'title': report.title,
            'category': report.category,
            'description': report.description,
            'location': report.location,
            'status': report.status,
            'created_at': report.created_at.strftime('%Y-%m-%d %H:%M:%S'),
        })


def report_detail_api(request, pk):

    report = get_object_or_404(
        Report,
        pk=pk
    )

    return JsonResponse({
        'id': report.id,
        'title': report.title,
        'category': report.category,
        'description': report.description,
        'location': report.location,
        'status': report.status,
        'created_at': report.created_at.strftime(
            '%Y-%m-%d %H:%M:%S'
        ),
    })