from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient

from .models import Book


class BookAPITests(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.book_data = {
            'title': 'Dune',
            'year': 1965,
            'author': 'Frank Herbert'
        }
        self.book = Book.objects.create(**self.book_data)

    def test_create_book(self):
        response = self.client.post('/api/books/', self.book_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_books(self):
        response = self.client.get('/api/books/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
