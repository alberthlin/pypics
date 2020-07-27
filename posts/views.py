from django.views.generic.list import ListView
from django.views.generic.edit import CreateView
from django.views.generic.detail import DetailView
from django import forms
from django.shortcuts import redirect
from django.urls import reverse

from posts.models import Post, Comment

class PostList(ListView):
    model = Post    

class PostCreate(CreateView):
    model = Post
    fields = ['image', 'description', 'author']
    success_url = '/'

class CommentForm(forms.Form):
    comment = forms.CharField()

class  PostDetail(DetailView):
    model = Post

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data(*args, **kwargs)
        context['comment_form'] = CommentForm()
        return context

    def post(self, request, *args, **kwargs): #this function will deal with POST actions 
        comment_form = CommentForm(request.POST)
        if comment_form.is_valid():
            print(request.user)
            print(self.get_object())
            print(comment_form.cleaned_data)
            comment = Comment(
                author=request.user,
                post=self.get_object(),
                text=comment_form.cleaned_data['comment'] 
            )
            print("hello")
            comment.save()
        else: #bad error handling
            raise Exception
        return redirect(reverse('detail', args=[self.get_object().id]))

