# usermanagement_24782004/views.py

from django.contrib import messages
from django.contrib.auth.views import LoginView, LogoutView
from django.urls import reverse_lazy
from django.views.generic import CreateView

from .forms import CustomUserCreationForm


class RegisterView(CreateView):
    form_class = CustomUserCreationForm
    template_name = 'usermanagement_24782004/register.html'
    success_url = reverse_lazy('login')

    def form_valid(self, form):
        messages.success(self.request, 'Registrasi berhasil. Silakan login.')
        return super().form_valid(form)


class CustomLoginView(LoginView):
    template_name = 'usermanagement_24782004/login.html'
    redirect_authenticated_user = True

    def get_success_url(self):
        return reverse_lazy('home')

    def get_form(self, form_class=None):
        form = super().get_form(form_class)
        form.fields['username'].widget.attrs.update({
            'class': 'form-control',
            'placeholder': 'Masukkan username'
        })
        form.fields['password'].widget.attrs.update({
            'class': 'form-control',
            'placeholder': 'Masukkan password'
        })
        return form

    def form_valid(self, form):
        messages.success(self.request, 'Berhasil login.')
        return super().form_valid(form)


class CustomLogoutView(LogoutView):
    next_page = reverse_lazy('login')

    def dispatch(self, request, *args, **kwargs):
        messages.success(request, 'Berhasil logout.')
        return super().dispatch(request, *args, **kwargs)