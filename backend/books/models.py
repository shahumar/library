from django.db import models


class Book(models.Model):
    title = models.CharField(max_length=200)
    year = models.IntegerField()
    author = models.CharField(max_length=200)

    def __str__(self):
        return self.title


class BookList(models.Model):
    name = models.CharField(max_length=200)
    books = models.ManyToManyField(Book, related_name='lists')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
