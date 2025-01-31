from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Book, BookList
from .serializers import BookListSerializer, BookSerializer


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    @action(detail=False, methods=['post'])
    def add_book_to_list(self, request, pk=None):
        serializer = self.serializer_class(data=request.data)
        list_id = request.data.get('list_id')
        book_list = get_object_or_404(BookList, pk=list_id)
        if serializer.is_valid():
            instance = serializer.save()
            book_list.books.add(instance)
            return Response({'status': 'book added'})
        return Response({'error': 'book not found'}, status=404)

    @action(detail=False, methods=['get'])
    def load_books_by_list(self, request):
        list_id = request.query_params.get('list_id')  # Get list_id from query parameters
        if not list_id:
            return Response({'error': 'list_id is required'}, status=status.HTTP_400_BAD_REQUEST)
        book_list = get_object_or_404(BookList, pk=list_id)
        books = book_list.books.all()
        serializer = self.get_serializer(books, many=True)
        return Response(serializer.data)

class BookListViewSet(viewsets.ModelViewSet):
    queryset = BookList.objects.all()
    serializer_class = BookListSerializer

    @action(detail=True, methods=['post'])
    def add_book(self, request, pk=None):
        book_list = self.get_object()
        book_id = request.data.get('book_id')
        try:
            book = Book.objects.get(id=book_id)
            book_list.books.add(book)
            return Response({'status': 'book added'})
        except Book.DoesNotExist:
            return Response({'error': 'book not found'}, status=404)

    @action(detail=True, methods=['post'])
    def remove_book(self, request, pk=None):
        book_list = self.get_object()
        book_id = request.data.get('book_id')
        try:
            book = Book.objects.get(id=book_id)
            book_list.books.remove(book)
            return Response({'status': 'book removed'})
        except Book.DoesNotExist:
            return Response({'error': 'book not found'}, status=404)
