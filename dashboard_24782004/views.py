from django.views.generic import TemplateView, View
from django.http import JsonResponse
from django.db.models import Count
from main_app.models import Report
from django.shortcuts import redirect
from django.contrib import messages



class DashboardView(TemplateView):
    template_name = 'dashboard_24782004/dashboard.html'

    def dispatch(self, request, *args, **kwargs):

        if not request.user.is_authenticated:
            messages.error(
                request,
                "Silakan login terlebih dahulu."
            )
            return redirect('login')

        if not request.user.is_admin:
            messages.error(
                request,
                "Akses Ditolak: hanya admin yang dapat mengakses dashboard."
            )
            return redirect('report_list')

        return super().dispatch(
            request,
            *args,
            **kwargs
        )

class DashboardStatsJsonView(View):
    def get(self, request, *args, **kwargs):
        status_data = list(
            Report.objects.values('status').annotate(total=Count('id')).order_by('status')
        )

        category_data = list(
            Report.objects.values('category').annotate(total=Count('id')).order_by('category')
        )

        latest_reported = list(
            Report.objects.filter(status='REPORTED')
            .order_by('-created_at')[:5]
            .values('id', 'title', 'category', 'location', 'status', 'created_at')
        )

        latest_resolved = list(
            Report.objects.filter(status='RESOLVED')
            .order_by('-created_at')[:5]
            .values('id', 'title', 'category', 'location', 'status', 'created_at')
        )

        return JsonResponse({
            'status_data': status_data,
            'category_data': category_data,
            'latest_reported': latest_reported,
            'latest_resolved': latest_resolved,
        })