from django.urls import path
from .views import (
    home,
    welcome,
    ReportListView,
    ReportDetailView,
    ReportCreateView,
    ReportUpdateView,
    ReportDeleteView,
    ReportUpdateStatusView,
    ReportLiveSearchView,
    ReportDetailJsonView,
)

urlpatterns = [
    path('', home, name='home'),
    path('welcome/', welcome, name='welcome'),

    # CREATE
    path('reports/add/', ReportCreateView.as_view(), name='report_create'),
    path('add-report/', ReportCreateView.as_view(), name='add_report'),

    # READ
    path('reports/', ReportListView.as_view(), name='report_list'),
    path('reports/<int:pk>/', ReportDetailView.as_view(), name='report_detail'),

    # UPDATE
    path('reports/update/<int:pk>/', ReportUpdateView.as_view(), name='report_update'),
    path('update-report/<int:pk>/', ReportUpdateView.as_view(), name='update_report'),

    # DELETE
    path('reports/delete/<int:pk>/', ReportDeleteView.as_view(), name='report_delete'),
    path('delete-report/<int:pk>/', ReportDeleteView.as_view(), name='delete_report'),

    # WORKFLOW STATUS
    path('reports/update-status/<int:pk>/', ReportUpdateStatusView.as_view(), name='update_status'),

    # LAB 7
    path('reports/search/', ReportLiveSearchView.as_view(), name='report_live_search'),
    path('report-search/', ReportLiveSearchView.as_view(), name='report_search'),
    path('reports/detail-json/<int:pk>/', ReportDetailJsonView.as_view(), name='report_detail_json'),
]