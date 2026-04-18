from django.urls import path
from .views import (
    home,
    welcome,
    ReportListView,
    ReportDetailView,
    ReportCreateView,
    ReportUpdateView,
    ReportDeleteView,
    ReportUpdateStatusView
)

urlpatterns = [
    path('', home, name='home'),
    path('welcome/', welcome, name='welcome'),

    path('reports/add/', ReportCreateView.as_view(), name='report_create'),
    path('reports/', ReportListView.as_view(), name='report_list'),
    path('reports/<int:pk>/', ReportDetailView.as_view(), name='report_detail'),
    path('reports/update/<int:pk>/', ReportUpdateView.as_view(), name='report_update'),
    path('reports/delete/<int:pk>/', ReportDeleteView.as_view(), name='report_delete'),
    path('reports/update-status/<int:pk>/', ReportUpdateStatusView.as_view(), name='update_status'),
]