from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.reverse import reverse
from django.shortcuts import get_object_or_404
from django.http import JsonResponse



# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import *
from .models import *

# # Create your views here.

# #LIST MOVIE AND GENRE AND ACTOR



@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'books-list': reverse('book-list', request=request, format=format),
        'books-detail': reverse('book-detail', args=[1], request=request, format=format),
        
        'authors-list': reverse('author-list', request=request, format=format),
        
        'genres-list': reverse('genre-list', request=request, format=format),
        # 'genres-detail': reverse('genre-detail', args=[1], request=request, format=format), 
        # 'genres-update': reverse('genre-update', args=[1], request=request, format=format)
    })


# def get_mpa_choices(request):
#     from .models import Movie
#     mpa_choices = Movie.get_mpa_choices()
#     return JsonResponse({'mpa_choices': mpa_choices})

class BookListView(APIView):
    def get(self, request):
        author_id = request.query_params.get('author_id')
        genre_name = request.GET.get('genre', "all")
        sort = request.GET.get('sort', "-starRating")
        title = request.GET.get('searchText')
        
        books = Book.objects.all().order_by(sort)
                 
        if title:
            books = books.filter(title__icontains=title)
                 
        if author_id:
            books = books.filter(author__id=author_id)  # Filter books by author member's ID
            serializer = BookSerializer(books, request, many=True)
                        
        if genre_name.lower() != "all" :
            books = books.filter(genre__name__iexact=genre_name)
            
        
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = BookSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        
        errors = serializer.errors
        errors['custom_message'] = 'Custom error message чето нетак с сохронением'

        return Response(errors, status=status.HTTP_400_BAD_REQUEST)
     
class GenresWithBookIDs(APIView):
    def get(self, request):
        genres = Genre.objects.all()
        serialized_data = []
        
        for genre in genres:
            book_ids = list(genre.book_set.values_list('id', flat=True))
            if book_ids:
                serialized_data.append(GenreSerializer(genre).data )
                
        return Response(serialized_data)
     
     
# @api_view(['GET'])
# def movie_detail(request, pk):
#     try:
#         movie = Movie.objects.get(pk=pk)
#     except Movie.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)
#     serializer = MovieSerializer(movie, context={'request': request})
#     return Response(serializer.data)

class BookUpdateView(APIView):
    def get(self, request, pk):
        try:
            book = Book.objects.get(pk=pk)
        except Book.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = BookSerializer(book, context={'request': request})
        return Response(serializer.data)
        
    def delete(self, request, pk):
        # Get the book instance to be deleted or return 404 if it doesn't exist
        book = get_object_or_404(Book, pk=pk)
        book.delete()  # Delete the book
        return JsonResponse({'message': 'Book deleted successfully'})
    
    def put(self, request, pk):
        book = get_object_or_404(Book, pk=pk)
        serializer = BookSerializer(book, data=request.data, context={'request': request})
        
        if serializer.is_valid():
                serializer.save()
                return Response(status=status.HTTP_204_NO_CONTENT)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
    
    

# @api_view(['GET','PUT', 'DELETE'])
# def movie_update(request, pk):
#     try:
#         movie = Movie.objects.get(pk=pk)
#     except Movie.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)
    
#     if request.method == 'GET':
#         serializer = MovieSerializer(movie, context={'request': request})
#         return Response(serializer.data)
    
#     if request.method == 'PUT':
#         serializer = MovieSerializer(movie, data=request.data, context={'request': request})
        
#         if serializer.is_valid():
#             serializer.save()
#             return Response(status=status.HTTP_204_NO_CONTENT)
        
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#     elif request.method == 'DELETE':
#         movie.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)
    
    
# #GENRE
    
    
    
class GenreList(APIView):
    def get(self, request):
        author_id = request.query_params.get('author_id')
        genre_with_book = request.query_params.get('genre_with_book')
        data = Genre.objects.all()
        
        if genre_with_book=='True':
            serialized_data = []    
            for genre in data:
                book_ids = list(genre.book_set.values_list('id', flat=True))
                if book_ids:
                    serialized_data.append(GenreSerializer(genre).data)
                    
            data = serialized_data
     
        if author_id:
            data = Genre.objects.filter(book__author__id=author_id).distinct()
            
        serializer = GenreSerializer(data, context={'request':request}, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = GenreSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        errors = serializer.errors
        errors['custom_message'] = 'Custom error message чето нетак с сохронением'

        return Response(errors, status=status.HTTP_400_BAD_REQUEST)
    
class AuthorList(APIView):
    def get(self, request):
        data = Author.objects.all()
        
          
        serializer = AuthorSerializer(data, context={'request':request}, many=True)
        return Response(serializer.data)


    def post(self, request):
        serializer = AuthorSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        
        errors = serializer.errors
        errors['custom_message'] = 'Custom error message чето нетак с сохронением'

        return Response(errors, status=status.HTTP_400_BAD_REQUEST)
     
    
   
   
class AuthorDetail(APIView):
    def get(self, request, pk):
        author = Author.objects.get(pk=pk)
        serializer = AuthorSerializer(author, context={'request': request})
        return Response(serializer.data) 
   

    
@api_view(['GET', 'POST'])
def genre_list(request):
    author_id = request.query_params.get('author_id')

    if request.method == 'GET':
        data = Genre.objects.all()
        
        if author_id:
            data = Genre.objects.filter(book__author__id=author_id).distinct()
                   
        serializer = GenreSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = GenreSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
     
# @api_view(['GET'])
# def genre_detail(request, pk):
#     try:
#         genre = Genre.objects.get(pk=pk)
#     except Genre.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)
#     serializer = GenreSerializer(genre, context={'request': request})
#     return Response(serializer.data)

# @api_view(['GET','PUT', 'DELETE'])
# def genre_update(request, pk):
#     try:
#         genre = Genre.objects.get(pk=pk)
#     except Genre.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)
    
#     if request.method == 'GET':
#         serializer = GenreSerializer(genre, context={'request': request})
#         return Response(serializer.data)
    
#     if request.method == 'PUT':
#         serializer = GenreSerializer(genre, data=request.data, context={'request': request})
        
#         if serializer.is_valid():
#             serializer.save()
#             return Response(status=status.HTTP_204_NO_CONTENT)
        
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#     elif request.method == 'DELETE':
#         genre.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)
    
    
    
# # ACTOR    
 
 
# @api_view(['GET', 'POST'])
# def actor_list(request):
#     if request.method == 'GET':
#         data = Actor.objects.all()
#         serializer = ActorSerializer(data, context={'request': request}, many=True)
#         return Response(serializer.data)
#     elif request.method == 'POST':
#         print('post')
#         serializer = ActorSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# class ActorDetailView(APIView):
#     def get(self, request, actor_id):
#         actor = Actor.objects.get(pk=actor_id)
#         serializer = ActorSerializer(actor, context={'request': request})
#         return Response(serializer.data) 

# @api_view(['GET','PUT', 'DELETE'])
# def actor_update(request, pk):
#     try:
#         actor = Actor.objects.get(pk=pk)
#     except Actor.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)
    
#     if request.method == 'GET':
#         serializer = ActorSerializer(actor, context={'request': request})
#         return Response(serializer.data)
    
#     if request.method == 'PUT':
#         serializer = ActorSerializer(actor, data=request.data, context={'request': request})
        
#         if serializer.is_valid():
#             serializer.save()
#             return Response(status=status.HTTP_204_NO_CONTENT)
        
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#     elif request.method == 'DELETE':
#         actor.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)
    
    
    

    
