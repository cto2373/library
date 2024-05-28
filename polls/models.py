from django.db import models
from rest_framework.reverse import reverse


# Create your models here.
from django.db import models
class Genre(models.Model):
    
    name = models.CharField( max_length=240)
    
    def __str__(self):
        return self.name

class Author(models.Model):
    """Model representing an author."""
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    date_of_birth = models.DateField(null=True, blank=True)
    date_of_death = models.DateField('died', null=True, blank=True)

    class Meta:
        ordering = ['last_name', 'first_name']

    def get_absolute_url(self):
        """Returns the url to access a particular author instance."""
        return reverse('author-detail', args=[str(self.id)])

    def __str__(self):
        """String for representing the Model object."""
        return '{0}, {1}'.format(self.last_name, self.first_name)

    


# class Book(models.Model):
    
#     title = models.CharField("Title", max_length=240)
#     starRating = models.DecimalField(max_digits=4, decimal_places=2)
#     rating = models.CharField("Rating", choices=MPA, max_length=5, default='NR')
#     year = models.DateField("Years", auto_now=False, auto_now_add=False)
#     genre = models.ForeignKey(Genre ,on_delete=models.SET_NULL, null=True)
#     runTime = models.DecimalField(max_digits=4, decimal_places=2)
#     cast = models.ManyToManyField(Actor, help_text="")
    # image = models.CharField("Image", blank=True, max_length=512)

#     def __str__(self):
#         return self.title
    
#     # @classmethod
#     def get_mpa_choices(self):
#         return self._meta.get_field('rating').choices
    
#     def get_absolute_url(self, request=None, format=None):
#         """
#         Returns the url to access a particular book instance.
#         """
#         return reverse('movie-detail', args=[str(self.id)], request=request, format=format)
    
    
class Book(models.Model):
    """Model representing a book (but not a specific copy of a book)."""
    title = models.CharField(max_length=200)
    author = models.ForeignKey('Author', on_delete=models.SET_NULL, null=True)
    starRating = models.DecimalField(max_digits=4, decimal_places=2)
    year = models.DateField("Years", auto_now=False, auto_now_add=False)
    image = models.CharField("Image", blank=True, max_length=512)


    summary = models.TextField(max_length=1000, help_text="Enter a brief description of the book")
    genre = models.ManyToManyField(Genre, help_text="Select a genre for this book")
  
    class Meta:
        ordering = ['title', 'author']

    def display_genre(self):
        return ', '.join([genre.name for genre in self.genre.all()[:3]])

    display_genre.short_description = 'Genre'

    def get_absolute_url(self, request=None, format=None):
        return reverse('book-detail', args=[str(self.id)], request=request, format=format)

    def __str__(self):
        """String for representing the Model object."""
        return self.title
    
    

    
# {
# "title":"adfsd",
# "author":"",
# "year":"2020-02-02",
# "summary":"asd",
# "starRating":"2",
# "genre":[{"name":"dbcjd"}]
# }