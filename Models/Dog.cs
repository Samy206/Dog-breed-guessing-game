using System.Runtime.CompilerServices;
using System.Xml.Linq;

namespace DogBreedGuessingGame.Models
{
    public class Dog(String Name, String Breed, Uri PictureURL)
    {
        public String? Name { get; set; }
        public required String Breed { get; set; }
        public required Uri PictureURL { get; set; }
    }
}
