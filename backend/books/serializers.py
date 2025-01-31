from rest_framework import serializers

from .models import Book, BookList


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'title', 'year', 'author']

class BookListSerializer(serializers.ModelSerializer):
    books = BookSerializer(many=True, read_only=True)

    class Meta:
        model = BookList
        fields = ['id', 'name', 'books', 'created_at']